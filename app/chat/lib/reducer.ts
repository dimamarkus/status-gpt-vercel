import {
  AddMessageAction,
  ADD_CONVERSATION,
  ADD_FOLDER,
  ADD_MESSAGE,
  ConversationActionTypes,
  DELETE_CONVERSATION,
  DELETE_FOLDER,
  RESET_FOLDERS,
  SET_CONVERSATIONS_STATE,
  UPDATE_CONVERSATION,
  UPDATE_FOLDER,
} from "#/app/chat/lib/actions";
import { EMPTY_CONVERSATION, EMPTY_FOLDER } from "#/app/chat/lib/constants";
import { Conversation, ConversationsFolder } from "#/app/chat/lib/types";
import { Reducer, useReducer } from "react";

export interface ConversationsDataState {
  folders: ConversationsFolder[];
  rootConversations: Conversation[];
}

export const initialConversationsDataState: ConversationsDataState = {
  folders: [],
  rootConversations: [],
};

export type ConversationsReducer = Reducer<ConversationsDataState, ConversationActionTypes>;

export function conversationsReducer(
  state: ConversationsDataState,
  action: ConversationActionTypes,
): ConversationsDataState {
  switch (action.type) {
    //  FOLDERS
    // ============================================================================
    case ADD_FOLDER:
      const folder = action.payload || EMPTY_FOLDER;
      const folderToAdd = { ...folder, id: Date.now() };
      const resultState = {
        ...state,
        folders: [...state.folders, folderToAdd],
      };
      return resultState;

    case UPDATE_FOLDER:
      return {
        ...state,
        folders: state.folders.map((folder) =>
          folder.id === action.payload.id ? { ...folder, ...action.payload } : folder,
        ),
      };

    case DELETE_FOLDER: {
      // Find the folder being deleted and its conversations
      const folderToDelete = state.folders.find((folder) => folder.id === action.folderId);
      const conversationsToMove = folderToDelete ? folderToDelete.conversations : [];

      // Remove the folder from the folders array
      const updatedFolders = state.folders.filter((folder) => folder.id !== action.folderId);

      // Move the conversations from the deleted folder to the root
      const updatedConversations = [...state.rootConversations, ...conversationsToMove];

      return { ...state, folders: updatedFolders, rootConversations: updatedConversations };
    }
    case RESET_FOLDERS:
      return initialConversationsDataState;

    //  CONVERSATIONS
    // ============================================================================
    case ADD_CONVERSATION:
      const conversation = action.payload || EMPTY_CONVERSATION;
      const conversationToAdd = { ...conversation };
      if (action.folderId) {
        const folders = state.folders.map((folder) => {
          if (folder.id === action.folderId) {
            return {
              ...folder,
              conversations: [...folder.conversations, conversationToAdd],
            };
          }
          return folder;
        });
        return { ...state, folders };
      } else {
        // Conversations outside folders
        return {
          ...state,
          rootConversations: [...state.rootConversations, conversationToAdd],
        };
      }

    case UPDATE_CONVERSATION: {
      const payload = action.payload as Conversation;

      // Remove the conversation from its current folder, if any
      let folders = state.folders.map((folder) => {
        const updatedConversations = folder.conversations.filter(
          (conversation) => conversation.id !== payload.id,
        );
        return { ...folder, conversations: updatedConversations };
      });

      // If the conversation is being moved to a new folder, add it to the target folder
      if (payload.folderId && payload.folderId !== 0) {
        const targetFolderIndex = state.folders.findIndex(
          (folder) => folder.id === payload.folderId,
        );
        if (targetFolderIndex !== -1) {
          const updatedConversation = {
            ...state.folders[targetFolderIndex].conversations.find(
              (conversation) => conversation.id === payload.id,
            ),
            ...payload,
          };
          folders[targetFolderIndex].conversations.push(updatedConversation);
        }
      } else {
        // If the conversation is being moved outside folders, update it directly in the state
        const updatedConversations = state.rootConversations.map((conversation) =>
          conversation.id === payload.id ? { ...conversation, ...payload } : conversation,
        );
        return { ...state, folders, rootConversations: updatedConversations };
      }
      // Remove the conversation from the root if it was moved
      const rootConversations = state.rootConversations.filter(
        (conversation) =>
          !(conversation.id === payload.id && payload.folderId !== conversation.folderId),
      );
      const resultingState = { ...state, folders, rootConversations };
      return resultingState;
    }

    case DELETE_CONVERSATION:
      const conversationToDelete = action?.payload;
      if (!!conversationToDelete.folderId) {
        const folders = state.folders.map((folder) =>
          folder.id === conversationToDelete.folderId
            ? {
                ...folder,
                conversations: folder.conversations.filter(
                  (conversation) => conversation.id !== conversationToDelete.id,
                ),
              }
            : folder,
        );
        return { ...state, folders };
      } else {
        // Conversations outside folders
        return {
          ...state,
          rootConversations: state.rootConversations.filter(
            (conversation) => conversation.id !== conversationToDelete.id,
          ),
        };
      }

    case SET_CONVERSATIONS_STATE:
      if (action.payload) {
        return {
          ...state,
          ...action.payload,
        };
      }
      return state;

    //  MESSAGES
    // ============================================================================
    case ADD_MESSAGE: {
      if (action.conversation.folderId > 0) {
        const updatedFolders = state.folders.map((folder) => {
          if (folder.id === action.conversation.folderId) {
            return { ...folder, conversations: addToConversation(folder.conversations, action) };
          }
          return folder;
        });
        return { ...state, folders: updatedFolders };
      } else {
        return { ...state, rootConversations: addToConversation(state.rootConversations, action) };
      }
    }

    default:
      return state;
  }
}

export const useConversationsReducer = () => {
  const [state, dispatch] = useReducer(conversationsReducer, initialConversationsDataState);
  return { state, dispatch };
};

const addToConversation = (conversations: Conversation[], action: AddMessageAction) => {
  const { payload: newMessage, conversation: conversationToUpdate } = action;
  return conversations.map((conversation) => {
    if (conversation.id === conversationToUpdate.id) {
      return {
        ...conversation,
        messages: [...conversation.messages, newMessage],
      };
    }
    return conversation;
  });
};
