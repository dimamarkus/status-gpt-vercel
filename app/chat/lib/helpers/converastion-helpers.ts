import { GPT4_MODEL } from "#/app/chat/lib/constants";
import { Conversation } from "#/app/chat/lib/types";
import { currentDate } from "#/lib/helpers/datetime-helpers";

export const cleanSelectedConversation = (conversation: Conversation) => {
  let updatedConversation = conversation;

  // check for model on each conversation
  if (!updatedConversation.model) {
    updatedConversation = {
      ...updatedConversation,
      model: updatedConversation.model || GPT4_MODEL,
    };
  }

  if (!updatedConversation.folderId) {
    updatedConversation = {
      ...updatedConversation,
      folderId: updatedConversation.folderId || 0,
    };
  }

  return updatedConversation;
};

export const cleanConversationHistory = (history: Conversation[]) => {
  return history.reduce((acc: Conversation[], conversation) => {
    try {
      if (!conversation.model) {
        conversation.model = GPT4_MODEL;
      }

      if (!conversation.folderId) {
        conversation.folderId = 0;
      }

      acc.push(conversation);
      return acc;
    } catch (error) {
      console.warn(`error while cleaning conversations' history. Removing culprit`, error);
    }
    return acc;
  }, []);
};

export const exportConversationData = () => {
  let history = localStorage.getItem("rootConversations");
  let folders = localStorage.getItem("folders");

  if (history) {
    history = JSON.parse(history);
  }

  if (folders) {
    folders = JSON.parse(folders);
  }

  const data = {
    history,
    folders,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `status_aidvisor_history_${currentDate()}.json`;
  link.href = url;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
