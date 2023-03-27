import {
  compileChatMessages,
  createChatBotMessage,
  getStartingChatLog,
  isChatModel,
} from "#/app/chat/lib/helpers/chat-helpers";
import {
  OpenAiChatResponse,
  OpenAiCompletionResponse,
  OpenAiModel,
  OpenAiRequest,
  OpenAiResponse,
} from "#/app/chat/lib/openai";
import { DEFAULT_GPT_SETTINGS } from "#/lib/constants/settings";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { inProdEnv } from "#/lib/helpers/env-helpers";
import { useRequestStream } from "#/lib/hooks/useRequestStream";
import { StatusChatMessage } from "#/lib/types";
import { Bot } from "#/lib/types/cms";
import { ChatFormFields } from "#/ui/modules/Chat/ChatInput/ChatInput";
import { event } from "nextjs-google-analytics";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
const { encode } = require("gptoken");

export const USER_INPUT_FIELD_ID = "chatInput";

export type UseChatGptReturn = {
  /**
   * The current bot you're speking to.
   */
  bot: Bot | null;
  /**
   * An array of all the messages that have been sent and received in the chat. Chat log is null
   * if no bot can be found.
   */
  chatLog: StatusChatMessage[] | null;
  /**
   * This is the answer streamed in real time.
   */
  streamedAnswer?: string;
  /**
   * This is the complete answer compiled from a finished stream.
   */
  answer?: string;
  /**
   * This will be true while waiting for the answer to come back from the OpenAI API
   */
  loading: boolean;
  /**
   * This will be set if there is an error with the OpenAI API call
   */
  error: string | null;
  /**
   * The return of useForm hook. Use this to create the user's chat input bot
   */
  inputFormContext: UseFormReturn<ChatFormFields, any> | null;
  /**
   * Triggers a call to the OpenAI API to get an answer which comes back in the form of a 'stream' or 'answer'
   */
  getAnswer: (query?: string, systemMode?: boolean) => Promise<void>;
  /**
   * Interrupts a response and cancels the fetch request
   */
  cancelStream: () => Promise<void>;
  /**
   * Cancels stream and resets the chat to the starting state
   */
  resetChat: () => Promise<void>;
};

export const useChatGpt = (
  /**
   * The bot that the user is chatting with. Used to popluate the initial ChatLog
   * with the bot's training and welcome message
   */
  bot: Bot | null,
  /**
   * A callback that returns the resultant ChatLog with the answer appended to it
   * Useful for making parallel requests with the answer such as requesting follow up suggestions
   */
  handleNewAnswer: (chatLog: StatusChatMessage[]) => void,
): UseChatGptReturn => {
  const getGptParam = (param: keyof Omit<OpenAiRequest, "stream" | "n">) =>
    (!!bot && bot[param]) || DEFAULT_GPT_SETTINGS[param];

  //  0. Prep
  // ============================================================================
  const startingChatLog = bot ? getStartingChatLog(bot) : null;
  const [currentQuery, setCurrentQuery] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState(startingChatLog);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const { features } = useFeatureToggleContext();
  const { stream, loading, error, requestStream, cancelStream } = useRequestStream(
    "/chat/" + bot?.slug,
  );
  const chatFormContext = useForm<ChatFormFields>({});
  const { getValues, setValue } = chatFormContext;
  const chatInput = getValues(USER_INPUT_FIELD_ID);
  const model = getGptParam("model") as OpenAiModel;

  const handleCancelStream = async () => {
    // Reset user input state first
    currentQuery && setValue(USER_INPUT_FIELD_ID, currentQuery);
    !!messages && setMessages(messages.slice(0, messages.length - 1));
    cancelStream();
  };

  const resetChat = async () => {
    handleCancelStream();
    setValue(USER_INPUT_FIELD_ID, "");
    setMessages(startingChatLog);
  };

  const getAnswer = async (query?: string, systemMode?: boolean) => {
    //  1. Set initial state
    // ============================================================================
    setCurrentQuery(query);
    setValue(USER_INPUT_FIELD_ID, "");
    setAnswer("");
    const chatMessages = compileChatMessages(messages, query || chatInput, bot?.memory);
    setMessages(chatMessages.all);

    //  2. Make GA Analytics event
    // ============================================================================
    const prompt = chatMessages.toSend.map(({ content }) => content).join("\n");
    const promptTokenCount = encode(prompt).length;
    event("submit_prompt", {
      category: bot?.slug,
      label: "Tokens: " + promptTokenCount,
    });

    //  3. Make the API Call
    // ============================================================================
    !inProdEnv && console.log("============================================================");
    !inProdEnv && console.log(`${model} request:`, chatMessages.toSend);

    const response = await requestStream({
      messages: chatMessages.toSend,
      stream: features.useStream,
    });

    //  4. Handle response
    // ============================================================================
    let resultString = features.useStream ? JSON.stringify(response) : response;
    let result = resultString && JSON.parse(resultString);
    if ((result as unknown as OpenAiResponse)?.choices) {
      result = isChatModel(model)
        ? (result as unknown as OpenAiChatResponse).choices[0].message?.content
        : (result as unknown as OpenAiCompletionResponse).choices[0].text;
    }

    if (!result) {
      return;
    }

    const resultingChatLog = [...chatMessages.all, createChatBotMessage(result)];
    setAnswer(result);
    setMessages(resultingChatLog);
    handleNewAnswer(resultingChatLog);
  };

  return {
    bot,
    cancelStream: handleCancelStream,
    resetChat,
    getAnswer,
    answer,
    streamedAnswer: stream,
    loading,
    error,
    chatLog: messages,
    inputFormContext: chatFormContext || null,
  };
};
