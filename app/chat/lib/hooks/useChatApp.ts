import { getBotParam } from "#/app/chat/lib/helpers/bot-helpers";
import {
  calculateMaxTokens,
  calculateTokens,
  isChatModel,
} from "#/app/chat/lib/helpers/chat-helpers";

import {
  GptMessage,
  OpenAiChatResponse,
  OpenAiCompletionResponse,
  OpenAiModel,
  OpenAiResponse,
  StatusChatMessage,
} from "#/app/chat/lib/types";
import { useSettingsContext } from "#/lib/contexts/SettingsContext";
import { UseRequestStreamReturnType, useRequestStream } from "#/lib/hooks/useRequestStream";
import { Bot } from "#/lib/types/cms";
import { ChatFormFields, USER_INPUT_FIELD_ID } from "#/ui/modules/Chat/ChatInput/ChatInput";
import { event as GAEvent } from "nextjs-google-analytics";
import { RefObject, useRef, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

export type UseChatAppReturn = {
  state: {
    currentQuery?: string;
    streamResult?: UseRequestStreamReturnType<OpenAiChatResponse>["streamResult"];
    answerStream?: UseRequestStreamReturnType<OpenAiChatResponse>["stream"];
    loading: UseRequestStreamReturnType<OpenAiChatResponse>["loading"];
    showSidebar: boolean;
    requestWasCancelled?: boolean
    currentMessage: StatusChatMessage | undefined;
    textareaRef: RefObject<HTMLTextAreaElement>;
    formContext: UseFormReturn<ChatFormFields, any>;
  };
  actions: {
    cancelStream: UseRequestStreamReturnType<OpenAiChatResponse>["cancelStream"]
    getAnswer: (chatLog: GptMessage[]) => Promise<string>;
    toggleSidebar: () => void;
    setUserInput: (newInput?: string) => void;
    setCurrentMessage: (message?: StatusChatMessage) => void;
  };
};

export const useChatApp = (bot: Bot | null): UseChatAppReturn => {

  const model = getBotParam(bot, "model") as OpenAiModel;
  const botMaxTokens = getBotParam(bot, "max_tokens") as number;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { settings } = useSettingsContext();

  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [currentQuery, setCurrentQuery] = useState<string | undefined>(undefined);
  const [currentMessage, setCurrentMessage] = useState<StatusChatMessage | undefined>();

  const { stream, loading, startStream, cancelStream, streamResult } = useRequestStream("/chat/" + bot?.slug);

  const formContext = useForm<ChatFormFields>({
    defaultValues: {
      [USER_INPUT_FIELD_ID]: "",
    },
  });

  // =========================================================================================
  //  Get Aswer
  // =========================================================================================
  const handleGetAnswer = async (messages: GptMessage[]) => {
    const lastMessage = messages[messages.length - 1];

    setCurrentQuery(lastMessage.content);

    const prompt = messages.map(({ content }) => content).join("\n");
    const promptTokenCount = calculateTokens(prompt);
    GAEvent("submit_prompt", {
      category: bot?.slug,
      label: "Tokens: " + promptTokenCount,
    });
    const max_tokens = calculateMaxTokens(botMaxTokens, settings.responseLength);
    const response = await startStream({
      messages,
      stream: settings.useStream,
      max_tokens,
      language: settings.language,
    });

    const resultString = settings.useStream ? JSON.stringify(response) : response;
    let result = resultString && JSON.parse(resultString);
    if ((result as unknown as OpenAiResponse)?.choices) {
      result = isChatModel(model)
        ? (result as unknown as OpenAiChatResponse).choices[0].message?.content
        : (result as unknown as OpenAiCompletionResponse).choices[0].text;
    }

    if (!!streamResult) {
      setCurrentQuery(undefined);
    }
    return result;
  };
  // == End Get Answer =====================================================================

  return {
    state: {
      streamResult,
      answerStream: stream,
      currentQuery,
      showSidebar,
      loading,
      textareaRef,
      formContext,
      currentMessage,
    },
    actions: {
      getAnswer: handleGetAnswer,
      setCurrentMessage,
      setUserInput: (newInput = "") => formContext.setValue(USER_INPUT_FIELD_ID, newInput),
      toggleSidebar: () => setShowSidebar(!showSidebar),
      cancelStream,
    },
  };
};
