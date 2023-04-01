"use client";

import { createChatMessage } from "#/app/chat/lib/helpers/chat-helpers";
import { USER_INPUT_FIELD_ID } from "#/app/chat/lib/hooks/useChatGpt";
import {
  useConversationsApp,
  UseConversationsAppReturn,
} from "#/app/chat/lib/hooks/useConversationsApp";
import {
  useConversationsData,
  UseConversationsDataReturn,
} from "#/app/chat/lib/hooks/useConversationsData";
import { useSelectedConversation } from "#/app/chat/lib/hooks/useSelectedConversation";
import { useSubmissions } from "#/app/chat/lib/hooks/useSubmissions";
import { useSuggestions } from "#/app/chat/lib/hooks/useSuggestions";
import { OpenAiRequest } from "#/app/chat/lib/types";
import { ConversationsDataState } from "#/app/chat/lib/reducer";
import { Conversation, StatusChatMessage } from "#/app/chat/lib/types";
import {
  DEFAULT_GPT_SETTINGS,
  SUBMISSIONS_PROMPT_SIZE,
  SUGGESTIONS_PROMPT_SIZE,
} from "#/lib/constants/settings";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import useUpdateEffect from "#/lib/hooks/useUpdateEffect";
import { Bot } from "#/lib/types/cms";
import React, { createContext, useCallback, useContext, useEffect } from "react";

interface ConversationsContextType {
  dataState: UseConversationsDataReturn["state"];
  dataActions: Omit<UseConversationsDataReturn["actions"], "addConversation" | "editMessage"> & {
    addConversation: () => void;
    editMessage: (message: StatusChatMessage, messageIndex: number) => void;
  };
  appState: UseConversationsAppReturn["state"] & {
    selectedConversation: Conversation | undefined;
  };
  appActions: UseConversationsAppReturn["actions"] & {
    submitQuery: (message: StatusChatMessage, chatLog?: StatusChatMessage[]) => void;
    selectConversation: (conversation: Conversation) => void;
  };
}

export type BotConversations = Record<Bot["slug"], ConversationsDataState>;

const ConversationsContext = createContext<ConversationsContextType | undefined>(undefined);

export type ConversationContextProps = {
  children: React.ReactNode;
  bot: Bot | null;
};

export function ConversationsContextProvider({ children, bot }: ConversationContextProps) {
  const getBotParam = (param: keyof Omit<OpenAiRequest, "stream" | "n">) =>
    (!!bot && bot[param]) || DEFAULT_GPT_SETTINGS[param];

  // This context combines the data and app states
  const { features } = useFeatureToggleContext();
  const { loading: suggestionsLoading, ...useSuggestionContext } = useSuggestions();
  const { loading: submissionsLoading, ...useSubmissionsContext } = useSubmissions();
  const { state: dataState, actions: dataActions } = useConversationsData(bot);
  const { selectedConversation, selectConversation, setSelectedConversation } =
    useSelectedConversation(dataState);
  const { state: appState, actions: appActions } = useConversationsApp(bot);
  const { folders, rootConversations } = dataState;
  const { resetConversation, addConversation, updateConversation } = dataActions;
  const { currentQuery, currentMessage } = appState;
  const { cancelStream, getAnswer, resetUserInput, setCurrentMessage } = appActions;
  const currentChatLog = selectedConversation?.messages;
  const firstAvailableConversation = rootConversations[0] || folders[0]?.conversations[0];
  const inInitialState = folders.length === 0 && rootConversations.length === 1;

  useUpdateEffect(() => {
    if (inInitialState || !selectedConversation) selectConversation(firstAvailableConversation);
  }, [dataState]);

  useUpdateEffect(() => {
    // If someone edits the message
    if (currentMessage) {
      // handleSubmitQuery(currentMessage);
      // setCurrentMessage(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMessage]);

  const handleSubmitQuery = async (message: StatusChatMessage, chatLog?: StatusChatMessage[]) => {
    if (!selectedConversation) return;
    dataActions.addMessage(selectedConversation, message);
    // TODO - add slicing based on bot memory
    const chatLogToUse = chatLog || selectedConversation.messages;
    const messagesToSend = [...chatLogToUse, message];
    const answer = await getAnswer(messagesToSend);
    const botAnswerMessage = createChatMessage("assistant", answer);
    const resultingChatLog = [...messagesToSend, botAnswerMessage];
    updateConversation({ ...selectedConversation, messages: resultingChatLog });
    features.enableSuggestions &&
      useSuggestionContext.getSuggestions(resultingChatLog.slice(-SUGGESTIONS_PROMPT_SIZE));
    features.enableSubmissions &&
      useSubmissionsContext.getSubmissions(resultingChatLog.slice(-SUBMISSIONS_PROMPT_SIZE));
  };

  const handleCancelStream = () => {
    if (!currentChatLog) return;
    console.log("currentQuery", currentQuery);
    resetUserInput(currentQuery);
    // updateConversation({ ...selectedConversation, messages: currentChatLog.slice(-1) });
    cancelStream();
  };

  const handleAddConversation = () => {
    const addedConversation = addConversation();
    addedConversation && setSelectedConversation(addedConversation);
  };

  const handleResetConversation = () => {
    cancelStream();
    resetUserInput();
    selectedConversation && resetConversation(selectedConversation);
  };

  const handleEditMessage = (message: StatusChatMessage, messageIndex: number) => {
    if (!selectedConversation) return;
    const updatedMessages = [...selectedConversation.messages];
    // Check if the provided index is within the bounds of the array
    if (messageIndex >= 0 && messageIndex < updatedMessages.length) {
      // Replace the message at the specified index with the new message
      updatedMessages[messageIndex] = message;
      updatedMessages.length = messageIndex;
    } else {
      console.error("Invalid message index:", messageIndex);
    }
    updateConversation({ ...selectedConversation, messages: updatedMessages });
    handleSubmitQuery(message, updatedMessages);
    // setCurrentMessage(message);
    // console.log("updatedMessages", updatedMessages);
    // return updatedMessages;
  };

  return (
    <ConversationsContext.Provider
      value={{
        appState: {
          ...appState,
          selectedConversation,
        },
        appActions: {
          ...appActions,
          selectConversation,
          submitQuery: handleSubmitQuery,
          cancelStream: handleCancelStream,
        },
        dataState,
        dataActions: {
          ...dataActions,
          addConversation: handleAddConversation,
          resetConversation: handleResetConversation,
          editMessage: handleEditMessage,
        },
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}

export function useConversationsContext() {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error("useConversationsContext must be used within a ConversationContextProvider");
  }
  return context;
}
