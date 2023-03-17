"use client";
import { createContext, useContext, useState } from "react";
import { useChatGpt, UseChatGptReturn } from "#/app/chat/lib/hooks/useChatGpt";
import { StatusChatMessage } from "#/lib/types";
import { useSuggestions, UseSuggestionsReturn } from "#/app/chat/lib/hooks/useSuggestions";
import { AssumptionsContextProvider } from "#/lib/contexts/AssumptionsContext";
import { FullScreenContextProvider } from "#/lib/contexts/FullScreenContext";
import { AvatarContextProvider } from "#/lib/contexts/AvatarContext";
import { Bot } from "#/lib/types/cms";

export type ChatContext = UseChatGptReturn &
  Omit<UseSuggestionsReturn, "loading"> & {
    suggestionsLoading: boolean;
  };

export const DEFAULT_SUGGESTIONS_RETURN: UseSuggestionsReturn = {
  loading: false,
  suggestions: [],
  showSuggestions: false,
  getSuggestions: async () => {},
  setShowSuggestions: () => {},
};

export const DEFAULT_CHAT_CONTEXT: ChatContext = {
  ...DEFAULT_SUGGESTIONS_RETURN,
  answer: undefined,
  chatLog: [],
  error: null,
  inputFormContext: null,
  streamedAnswer: undefined,
  loading: DEFAULT_SUGGESTIONS_RETURN.loading,
  suggestionsLoading: false,
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

  // const { assumptions, areAssumptionsShown, setShowAssumptions } = useAssumptionsContext();
  // const assumptionsJson = JSON.stringify(assumptions);
  // const assumptionsDeclaration = `Consider everything going forward assuming the following things about me: ${assumptionsJson}`;
  // const assumptionsMessage = { role: "system", content: assumptionsDeclaration, timestamp: Date.now() } as StatusChatMessage;

  return (
    <AssumptionsContextProvider>
      <AvatarContextProvider>
        <Context.Provider value={{ ...context, suggestionsLoading, ...useSuggestionContext }}>
          {children}
        </Context.Provider>
      </AvatarContextProvider>
    </AssumptionsContextProvider>
  );
};

export const useChatContext = () => {
  return useContext(Context);
};
