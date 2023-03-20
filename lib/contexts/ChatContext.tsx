"use client";
import { createContext, useContext } from "react";
import { useChatGpt, UseChatGptReturn } from "#/app/chat/lib/hooks/useChatGpt";
import {
  DEFAULT_SUBMISSIONS_RETURN,
  useSubmissions,
  UseSubmissionsReturn,
} from "#/app/chat/lib/hooks/useSubmissions";
import {
  DEFAULT_SUGGESTIONS_RETURN,
  useSuggestions,
  UseSuggestionsReturn,
} from "#/app/chat/lib/hooks/useSuggestions";
import { AssumptionsContextProvider } from "#/lib/contexts/AssumptionsContext";
import { AvatarContextProvider } from "#/lib/contexts/AvatarContext";
import { Bot } from "#/lib/types/cms";

export type ChatContext = UseChatGptReturn &
  Omit<UseSuggestionsReturn, "loading"> &
  Omit<UseSubmissionsReturn, "loading"> & {
    suggestionsLoading: boolean;
    submissionsLoading: boolean;
  };

export const DEFAULT_CHAT_CONTEXT: ChatContext = {
  ...DEFAULT_SUBMISSIONS_RETURN,
  ...DEFAULT_SUGGESTIONS_RETURN,
  answer: undefined,
  chatLog: [],
  error: null,
  inputFormContext: null,
  streamedAnswer: undefined,
  loading: DEFAULT_SUGGESTIONS_RETURN.loading,
  suggestionsLoading: false,
  submissionsLoading: false,
  getAnswer: async () => {},
};

export const Context = createContext<ChatContext>(DEFAULT_CHAT_CONTEXT);

type ChatProps = {
  children: any;
  bot: Bot | null;
};

export const ChatContextProvider = ({ bot, children }: ChatProps) => {
  const context = useChatGpt(bot);
  const { loading: suggestionsLoading, ...useSuggestionContext } = useSuggestions();
  const { loading: submissionsLoading, ...useSubmissionsContext } = useSubmissions();

  // const { assumptions, areAssumptionsShown, setShowAssumptions } = useAssumptionsContext();
  // const assumptionsJson = JSON.stringify(assumptions);
  // const assumptionsDeclaration = `Consider everything going forward assuming the following things about me: ${assumptionsJson}`;
  // const assumptionsMessage = { role: "system", content: assumptionsDeclaration, timestamp: Date.now() } as StatusChatMessage;

  return (
    <AssumptionsContextProvider>
      <AvatarContextProvider>
        <Context.Provider
          value={{
            ...context,
            suggestionsLoading,
            ...useSuggestionContext,
            submissionsLoading,
            ...useSubmissionsContext,
          }}
        >
          {children}
        </Context.Provider>
      </AvatarContextProvider>
    </AssumptionsContextProvider>
  );
};

export const useChatContext = () => {
  return useContext(Context);
};
