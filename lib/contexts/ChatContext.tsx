"use client";

import { compileChatMessages, createChatMessage } from "#/app/chat/lib/helpers/chat-helpers";
import {
  SidebarState,
  UseChatSidebarReturn,
  useChatSidebar,
} from "#/app/chat/lib/hooks/useChatSidebar";
import {
  UseChatAppReturn,
  useChatApp,
} from "#/app/chat/lib/hooks/useChatApp";
import {
  UseConversationsDataReturn,
  useChatData,
} from "#/app/chat/lib/hooks/useChatData";
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
import {useSettingsContext} from "#/lib/contexts/SettingsContext";

interface ChatContextType {
  dataState: UseConversationsDataReturn["state"] & {
    submissions: UseSubmissionsReturn["submissions"];
    assumptions: AssumptionsContext["assumptions"];
  };
  dataActions: Omit<UseConversationsDataReturn["actions"], "addConversation" | "editMessage"> & {
    addConversation: () => void;
    editMessage: (message: StatusChatMessage, messageIndex: number) => void;
  };
  appState: UseChatAppReturn["state"] & {
    selectedConversation: Conversation | undefined;
    sidebar: SidebarState;
    suggestions: UseSuggestionsReturn["suggestions"];
    suggestionsLoading: UseSuggestionsReturn["loading"];
    submissionsLoading: UseSubmissionsReturn["loading"];
  };
  appActions: UseChatAppReturn["actions"] &
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
  const { settings } = useSettingsContext();
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
  const { state: dataState, actions: dataActions } = useChatData(bot);
  const { selectedConversation, selectConversation, setSelectedConversation } =
    useSelectedConversation(dataState);
  const { state: appState, actions: appActions } = useChatApp(bot);
  const { folders, rootConversations } = dataState;
  const { resetConversation, addConversation, updateConversation } = dataActions;
  const { currentQuery, loading, answerStream, requestWasCancelled, streamResult } = appState;
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

  const handleSubmitQuery = async (userMessage: StatusChatMessage, chatLog?: StatusChatMessage[]) => {
    let conversation = selectedConversation || addConversation();
    let messagesSoFar = chatLog || conversation.messages
    if (!selectedConversation) {
      conversation = addConversation();
      setSelectedConversation(conversation);
    } else {
      dataActions.addMessage(selectedConversation, userMessage);
    }

    const chatMessages = compileChatMessages(
      messagesSoFar,
      userMessage.content,
      bot?.memory,
    );

    const answer = await getAnswer(chatMessages.toSend);

    const isFirstMessageInChat = chatMessages.all.length === 2; /* 1 system, 1 welcome */
    if (isFirstMessageInChat) {
      const content = userMessage.content
      const conversationName = content.length > 30 ? content.substring(0, 30) + "..." : content;
      conversation = {
        ...conversation,
        name: capitalizeFirstLetter(conversationName),
      };
    }

    if (answer) {
      const resultingChatLog = [...chatMessages.all, createChatMessage("assistant", answer)]
      !!answer && updateConversation({ ...conversation, messages: resultingChatLog });
      settings.enableSuggestions && suggestionsActions.getSuggestions(resultingChatLog);
      features.enableSubmissions && submissionsActions.getSubmissions(resultingChatLog);
    }
  };

  const handleCancelStream = async (alsoRemoveQuestion?: boolean) => {
    if (!currentChatLog) return undefined;
    setUserInput(currentQuery);
    cancelStream();
    const cancelResult = await cancelStream();
    if (alsoRemoveQuestion) {
      updateConversation({ ...selectedConversation, messages: selectedConversation.messages.slice(0,-1) });
    } else if (cancelResult) {
      const prevResponseMessage = createChatMessage("assistant", cancelResult)
      dataActions.addMessage(selectedConversation, prevResponseMessage);
    }
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
