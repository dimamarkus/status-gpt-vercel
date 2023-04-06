import { GPT4_MODEL } from "#/app/chat/lib/constants";
import { ConversationsDataState } from "#/app/chat/lib/reducer";
import { Conversation } from "#/app/chat/lib/types";
import { currentDate } from "#/lib/helpers/datetime-helpers";
import { parseJson } from "#/lib/helpers/string-helpers";
import { Bot } from "#/lib/types/cms";

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

export const exportConversationData = (bot?: Bot) => {
  const allConversations = localStorage.getItem("conversations");

  if (!allConversations) {
    return;
  }

  const parsedConversations = parseJson(allConversations);

  const conversations = bot ? parsedConversations[bot.slug] : allConversations;

  const blob = new Blob([JSON.stringify(conversations, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const fileName = bot
    ? `status_aidvisor_conversations_with_${bot.slug}`
    : "status_aidvisor_conversations";
  link.download = `${fileName}_${currentDate()}.json`;
  link.href = url;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
