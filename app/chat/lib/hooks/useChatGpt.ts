import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  compileChatMessages,
  createChatBotMessage,
  getStartingChatLog,
  isChatModel,
} from "#/app/chat/lib/helpers/chat-helpers";
import { OpenAiModel, OpenAiRequest } from "#/app/chat/lib/openai";
import { DEFAULT_GPT_SETTINGS } from "#/lib/constants/settings";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useGetStream } from "#/lib/hooks/useGetStream";
import { StatusChatMessage } from "#/lib/types";
import { Bot } from "#/lib/types/cms";
import { GENERATE_CHAT_ENDPOINT } from "#/pages/api/chat/generate";
import { GENERATE_CHAT_STREAM_ENDPOINT } from "#/pages/api/chat/generate-stream";
import { ChatFormFields } from "#/ui/modules/Chat/ChatInput/ChatInput";
import { inProdEnv } from "#/lib/helpers/env-helpers";

export const USER_INPUT_FIELD_ID = "chatInput";

export type UseChatGptReturn = {
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
};

export const useChatGpt = (bot: Bot | null): UseChatGptReturn => {
  const startingChatLog = bot ? getStartingChatLog(bot) : null;

  //  1. Prep State
  // ============================================================================
  const [messages, setMessages] = useState(startingChatLog);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const { features } = useFeatureToggleContext();

  const getGptParam = (param: keyof Omit<OpenAiRequest, "stream" | "n">) =>
    (!!bot && bot[param]) || DEFAULT_GPT_SETTINGS[param];

  const endpointUrl = features.useStream ? GENERATE_CHAT_STREAM_ENDPOINT : GENERATE_CHAT_ENDPOINT;
  const { stream, loading, error, getStream } = useGetStream(endpointUrl);
  if (error) {
    console.error("useChatGpt() error", error);
    throw new Error(error);
  }

  const formContext = useForm<ChatFormFields>({});
  const { getValues, setValue } = formContext;
  const chatInput = getValues(USER_INPUT_FIELD_ID);

  const getAnswer = async (query?: string, systemMode?: boolean) => {
    const chatMessages = compileChatMessages(messages, query || chatInput, bot?.memory);

    //  2. Update the state after user click
    // ============================================================================
    setValue(USER_INPUT_FIELD_ID, "");
    setAnswer("");
    setMessages(chatMessages.all);

    //  3. Prep the API Call
    // ============================================================================
    const prompt = chatMessages.toSend.map(({ content }) => content).join("\n");
    const model = getGptParam("model") as OpenAiModel;
    const messagesToSend = isChatModel(model) ? { messages: chatMessages.toSend } : { prompt };
    const tokens = getGptParam("max_tokens")?.toString();
    const max_tokens = !!tokens ? parseInt(tokens, 10) : DEFAULT_GPT_SETTINGS["max_tokens"];
    const requestBody = {
      ...messagesToSend,
      model: getGptParam("model"),
      temperature: getGptParam("temperature"),
      top_p: getGptParam("top_p"),
      frequency_penalty: getGptParam("frequency_penalty"),
      presence_penalty: getGptParam("presence_penalty"),
      max_tokens,
      n: DEFAULT_GPT_SETTINGS["n"],
      stream: features.useStream,
    };

    //  4. Make the API Call
    // ============================================================================
    !inProdEnv && console.log("============================================================");
    !inProdEnv && console.log(`I'm asking ${getGptParam("model")} a question:`, requestBody);
    const response = await getStream(requestBody);

    //  4. Handle response
    // ============================================================================
    if (response) {
      setAnswer(response);
      setMessages([...chatMessages.all, createChatBotMessage(response)]);
    }
  };

  return {
    getAnswer,
    answer,
    streamedAnswer: stream,
    loading,
    error,
    chatLog: messages,
    inputFormContext: formContext || null,
  };
};
