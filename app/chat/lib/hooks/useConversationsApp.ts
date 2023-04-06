import { getBotParam } from "#/app/chat/lib/helpers/bot-helpers";
import {
  calculateMaxTokens,
  calculateTokens,
  isChatModel,
} from "#/app/chat/lib/helpers/chat-helpers";
import { USER_INPUT_FIELD_ID } from "#/app/chat/lib/hooks/useChatGpt";
import {
  GptMessage,
  OpenAiChatResponse,
  OpenAiCompletionResponse,
  OpenAiModel,
  OpenAiResponse,
  StatusChatMessage,
} from "#/app/chat/lib/types";
import { useSettingsContext } from "#/lib/contexts/SettingsContext";
import { useRequestStream } from "#/lib/hooks/useRequestStream";
import { Bot } from "#/lib/types/cms";
import { ChatFormFields } from "#/ui/modules/Chat/ChatInput/ChatInput";
import { event as GAEvent } from "nextjs-google-analytics";
import { RefObject, useRef, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

export type UseConversationsAppReturn = {
  state: {
    answer?: string;
    answerStream?: string;
    currentQuery?: string;
    requestWasCancelled?: boolean;
    showSidebar: boolean;
    loading: boolean;
    currentMessage: StatusChatMessage | undefined;
    textareaRef: RefObject<HTMLTextAreaElement>;
    formContext: UseFormReturn<ChatFormFields, any>;
  };
  actions: {
    cancelStream: (resetState?: boolean) => void;
    getAnswer: (chatLog: GptMessage[]) => Promise<string>;
    toggleSidebar: () => void;
    setUserInput: (newInput?: string) => void;
    setCurrentMessage: (message?: StatusChatMessage) => void;
  };
};

export const useConversationsApp = (bot: Bot | null): UseConversationsAppReturn => {
  const { settings } = useSettingsContext();
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [currentQuery, setCurrentQuery] = useState<string | undefined>(undefined);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const [currentMessage, setCurrentMessage] = useState<StatusChatMessage | undefined>();

  const { stream, loading, error, startStream, cancelStream, fullValue, requestWasCancelled } =
    useRequestStream("/chat/" + bot?.slug);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const formContext = useForm<ChatFormFields>({
    defaultValues: {
      [USER_INPUT_FIELD_ID]: "",
    },
  });
  const { setValue } = formContext;

  const model = getBotParam(bot, "model") as OpenAiModel;
  const botMaxTokens = getBotParam(bot, "max_tokens") as number;

  const setUserInput = (newInput = "") => setValue(USER_INPUT_FIELD_ID, newInput);

  const handleGetAnswer = async (messages: GptMessage[]) => {
    const lastMessage = messages[messages.length - 1];

    setCurrentQuery(lastMessage.content);
    setAnswer("");

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

    if (!!fullValue) {
      setAnswer(fullValue);
      setCurrentQuery(undefined);
    }
    return result;
  };

  return {
    state: {
      answer,
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
      setUserInput,
      setCurrentMessage,
      toggleSidebar: () => setShowSidebar(!showSidebar),
      cancelStream,
    },
  };
};
