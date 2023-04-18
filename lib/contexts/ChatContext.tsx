"use client";

import { compileChatMessages, createChatMessage } from "#/app/chat/lib/helpers/chat-helpers";
import {
  SidebarState,
  UseChatSidebarReturn,
  useChatSidebar,
} from "#/app/chat/lib/hooks/useChatSidebar";
import {
  UseConversationsAppReturn,
  useConversationsApp,
} from "#/app/chat/lib/hooks/useConversationsApp";
import {
  UseConversationsDataReturn,
  useConversationsData,
} from "#/app/chat/lib/hooks/useConversationsData";
import { useSelectedConversation } from "#/app/chat/lib/hooks/useSelectedConversation";
import { UseSubmissionsReturn, useSubmissions } from "#/app/chat/lib/hooks/useSubmissions";
import { UseSuggestionsReturn, useSuggestions } from "#/app/chat/lib/hooks/useSuggestions";
import { ConversationsDataState } from "#/app/chat/lib/reducer";
import { Conversation, StatusChatMessage } from "#/app/chat/lib/types";
import { SUBMISSIONS_PROMPT_SIZE, SUGGESTIONS_PROMPT_SIZE } from "#/lib/constants/settings";
import { AssumptionsContext, useAssumptionsContext } from "#/lib/contexts/AssumptionsContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { capitalizeFirstLetter } from "#/lib/helpers/string-helpers";
import useUpdateEffect from "#/lib/hooks/useUpdateEffect";
import { Bot } from "#/lib/types/cms";
import React, { createContext, useContext, useEffect } from "react";

interface ChatContextType {
  dataState: UseConversationsDataReturn["state"] & {
    submissions: UseSubmissionsReturn["submissions"];
    assumptions: AssumptionsContext["assumptions"];
  };
  dataActions: Omit<UseConversationsDataReturn["actions"], "addConversation" | "editMessage"> & {
    addConversation: () => void;
    editMessage: (message: StatusChatMessage, messageIndex: number) => void;
  };
  appState: UseConversationsAppReturn["state"] & {
    selectedConversation: Conversation | undefined;
    sidebar: SidebarState;
    suggestions: UseSuggestionsReturn["suggestions"];
    suggestionsLoading: UseSuggestionsReturn["loading"];
    submissionsLoading: UseSubmissionsReturn["loading"];
  };
  appActions: UseConversationsAppReturn["actions"] &
    Omit<UseChatSidebarReturn, "sidebarState"> & {
      submitQuery: (message: StatusChatMessage, chatLog?: StatusChatMessage[]) => void;
      selectConversation: (conversation: Conversation) => void;
    };
}

export type BotConversations = Record<Bot["slug"], ConversationsDataState>;

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export type ConversationContextProps = {
  children: React.ReactNode;
  bot: Bot | null;
};

export function ChatContextProvider({ children, bot }: ConversationContextProps) {
  // This context combines the data and app states
  const { features } = useFeatureToggleContext();
  const {
    suggestions,
    loading: suggestionsLoading,
    showSuggestions,
    ...suggestionsActions
  } = useSuggestions();
  const {
    submissions,
    loading: submissionsLoading,
    showSubmissions,
    ...submissionsActions
  } = useSubmissions();
  const { assumptions, ...assumptionsActions } = useAssumptionsContext();
  const { sidebarState, ...sidebarActions } = useChatSidebar();
  const { state: dataState, actions: dataActions } = useConversationsData(bot);
  const { selectedConversation, selectConversation, setSelectedConversation } =
    useSelectedConversation(dataState);
  const { state: appState, actions: appActions } = useConversationsApp(bot);
  const { folders, rootConversations } = dataState;
  const { resetConversation, addConversation, updateConversation } = dataActions;
  const { currentQuery, requestWasCancelled } = appState;
  const { cancelStream, getAnswer, setUserInput, setCurrentMessage } = appActions;
  const currentChatLog = selectedConversation?.messages;
  const firstAvailableConversation = rootConversations[0] || folders[0]?.conversations[0];
  const inInitialState = folders.length === 0 && rootConversations.length === 1;

  // EXPERIMENT: little easter egg to show off bg changes
  useEffect(() => {
    bot && bot.slug === "taxson"
      ? document.body.classList.add("bg-darkhex")
      : document.body.classList.remove("bg-darkhex");
  }, [bot]);

  useUpdateEffect(() => {
    if (inInitialState || !selectedConversation) selectConversation(firstAvailableConversation);
  }, [dataState]);

  const handleSubmitQuery = async (message: StatusChatMessage, chatLog?: StatusChatMessage[]) => {
    let conversation = selectedConversation || addConversation();
    if (!selectedConversation) {
      conversation = addConversation();
      setSelectedConversation(conversation);
    } else {
      dataActions.addMessage(selectedConversation, message);
    }

    const chatMessages = compileChatMessages(
      chatLog || conversation.messages,
      message.content,
      bot?.memory,
    );

    const answer = await getAnswer(chatMessages.toSend);

    if (requestWasCancelled) {
      console.log("REQUEST WAS CANCELLLED!", requestWasCancelled);
    }
    const resultingChatLog = answer
      ? [...chatMessages.all, createChatMessage("assistant", answer)]
      : chatMessages.all;
    const isFirstMessageInChat = conversation.messages.length === 2; /* 1 system, 1 welcome */
    if (isFirstMessageInChat) {
      const { content } = message;
      const conversationName = content.length > 30 ? content.substring(0, 30) + "..." : content;
      conversation = {
        ...conversation,
        name: capitalizeFirstLetter(conversationName),
      };
    }

    updateConversation({ ...conversation, messages: resultingChatLog });
    features.enableSuggestions &&
      !requestWasCancelled &&
      suggestionsActions.getSuggestions(resultingChatLog);
    features.enableSubmissions &&
      !requestWasCancelled &&
      submissionsActions.getSubmissions(resultingChatLog);
  };

  const handleCancelStream = async () => {
    if (!currentChatLog) return;
    console.log("currentQuery", currentQuery);
    setUserInput(currentQuery);
    // updateConversation({ ...selectedConversation, messages: currentChatLog.slice(-1) });
    cancelStream();
  };

  const handleAddConversation = async () => {
    const addedConversation = addConversation();
    addedConversation && setSelectedConversation(addedConversation);
    sidebarActions.setSidebarSectionState("conversations", true);
    appState.textareaRef.current?.focus();
  };

  const handleResetConversation = () => {
    cancelStream();
    setUserInput();
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
    setCurrentMessage(message);
  };

  return (
    <ChatContext.Provider
      value={{
        appState: {
          ...appState,
          selectedConversation,
          sidebar: sidebarState,
          suggestions,
          suggestionsLoading,
          submissionsLoading,
        },
        appActions: {
          ...appActions,
          ...sidebarActions,
          ...suggestionsActions,
          selectConversation,
          submitQuery: handleSubmitQuery,
          cancelStream: handleCancelStream,
        },
        dataState: {
          bot,
          folders,
          rootConversations,
          submissions,
          assumptions,
        },
        dataActions: {
          ...dataActions,
          ...submissionsActions,
          ...assumptionsActions,
          addConversation: handleAddConversation,
          resetConversation: handleResetConversation,
          editMessage: handleEditMessage,
        },
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
}
