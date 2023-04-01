import { ConversationsDataState, useConversationsReducer } from "#/app/chat/lib/reducer";
import { Conversation, ConversationsFolder, StatusChatMessage } from "#/app/chat/lib/types";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { useLocalStorage } from "#/lib/hooks/useStorage";
import useUpdateEffect from "#/lib/hooks/useUpdateEffect";
import { useState, useMemo, useEffect } from "react";

// Has to be nested under the ConversationContext to have access to ALL conversations
export const useSelectedConversation = (dataState: ConversationsDataState) => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | undefined>(
    undefined,
  );

  const [storageValue, setStorageValue, remove] = useLocalStorage<Conversation>(
    "selectedConversation",
    selectedConversation,
  );

  const { rootConversations, folders } = dataState;

  const flattenedConversations = useMemo(
    () => [
      ...rootConversations,
      ...folders.flatMap((folder: ConversationsFolder) => folder.conversations),
    ],
    [folders, rootConversations],
  );

  useEffect(() => {
    if (selectedConversation) {
      const conversationToUpdate = flattenedConversations.find(
        (conversation) => conversation.id === selectedConversation.id,
      );

      if (conversationToUpdate) {
        setSelectedConversation(conversationToUpdate);
      }
    } else {
      setSelectedConversation(flattenedConversations[0]);
    }
  }, [flattenedConversations, selectedConversation]);

  useUpdateEffect(() => {
    selectedConversation ? setStorageValue(selectedConversation) : remove();
  }, [selectedConversation]);

  const selectConversation = (submittedConversation: Conversation) => {
    const conversation = flattenedConversations.find(
      (conversation) => conversation.id === submittedConversation.id,
    );
    setSelectedConversation(conversation);
  };

  return {
    selectConversation,
    selectedConversation,
    setSelectedConversation,
  };
};
