import { getBotParam } from "#/app/chat/lib/helpers/bot-helpers";
import { calculateTokens, isChatModel } from "#/app/chat/lib/helpers/chat-helpers";
import { USER_INPUT_FIELD_ID } from "#/app/chat/lib/hooks/useChatGpt";
import { event as GAEvent } from "nextjs-google-analytics";
import {
  OpenAiChatResponse,
  OpenAiCompletionResponse,
  OpenAiModel,
  OpenAiResponse,
} from "#/app/chat/lib/types";
import { StatusChatMessage } from "#/app/chat/lib/types";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useRequestStream } from "#/lib/hooks/useRequestStream";
import { Bot } from "#/lib/types/cms";
import { RefObject, useRef, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { ChatFormFields } from "#/ui/modules/Chat/ChatInput/ChatInput";

export type UseConversationsAppReturn = {
  state: {
    answer?: string;
    answerStream?: string;
    currentQuery?: string;
    showSidebar: boolean;
    loading: boolean;
    currentMessage: StatusChatMessage | undefined;
    textareaRef: RefObject<HTMLTextAreaElement>;
    formContext: UseFormReturn<ChatFormFields, any>;
  };
  actions: {
    cancelStream: () => void;
    getAnswer: (chatLog: StatusChatMessage[], deleteCount?: number) => Promise<string>;
    toggleSidebar: () => void;
    resetUserInput: (newInput?: string) => void;
    setCurrentMessage: (message?: StatusChatMessage) => void;
  };
};

export const useConversationsApp = (bot: Bot | null): UseConversationsAppReturn => {
  const { features } = useFeatureToggleContext();
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [currentQuery, setCurrentQuery] = useState<string | undefined>(undefined);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const [currentMessage, setCurrentMessage] = useState<StatusChatMessage | undefined>();

  const { stream, loading, error, requestStream, cancelStream } = useRequestStream(
    "/chat/" + bot?.slug,
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const max_tokens = getBotParam(bot, "max_tokens") as number;
  const formContext = useForm<ChatFormFields>({
    defaultValues: {
      [USER_INPUT_FIELD_ID]: "",
      max_tokens: max_tokens / 2, // Set starting value to half of max_tokens
    },
  });
  const { getValues, setValue } = formContext;

  const model = getBotParam(bot, "model") as OpenAiModel;

  const resetUserInput = (newInput = "") => setValue(USER_INPUT_FIELD_ID, newInput);

  const handleGetAnswer = async (messages: StatusChatMessage[], deleteCount?: number) => {
    const lastMessage = messages[messages.length - 1];

    setCurrentQuery(lastMessage.content);
    setAnswer("");

    const prompt = messages.map(({ content }) => content).join("\n");
    const promptTokenCount = calculateTokens(prompt);
    GAEvent("submit_prompt", {
      category: bot?.slug,
      label: "Tokens: " + promptTokenCount,
    });

    const response = await requestStream({
      messages,
      stream: features.useStream,
      max_tokens: getValues("max_tokens"),
    });

    const resultString = features.useStream ? JSON.stringify(response) : response;
    let result = resultString && JSON.parse(resultString);
    if ((result as unknown as OpenAiResponse)?.choices) {
      result = isChatModel(model)
        ? (result as unknown as OpenAiChatResponse).choices[0].message?.content
        : (result as unknown as OpenAiCompletionResponse).choices[0].text;
    }

    if (!!result) {
      setAnswer(result);
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
      resetUserInput,
      setCurrentMessage,
      toggleSidebar: () => setShowSidebar(!showSidebar),
      cancelStream,
    },
  };
};
