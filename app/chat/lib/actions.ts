import { ConversationsDataState } from "#/app/chat/lib/reducer";
import { Conversation, ConversationsFolder, StatusChatMessage } from "#/app/chat/lib/types";

//  FOLDERS
// ============================================================================

export const RESET_FOLDERS = "RESET_FOLDERS";
interface ResetFoldersAction {
  type: typeof RESET_FOLDERS;
}

export const ADD_FOLDER = "ADD_FOLDER";
interface AddFolderAction {
  type: typeof ADD_FOLDER;
  payload?: ConversationsFolder;
}

export const DELETE_FOLDER = "DELETE_FOLDER";
interface DeleteFolderAction {
  type: typeof DELETE_FOLDER;
  folderId: number;
}

export const UPDATE_FOLDER = "UPDATE_FOLDER";
interface UpdateFolderAction {
  type: typeof UPDATE_FOLDER;
  payload: Partial<ConversationsFolder> & {
    id: number;
  };
}

//  CONVERSATIONS
// ============================================================================

export const SET_CONVERSATIONS_STATE = "SET_CONVERSATIONS_STATE";
interface SetConversationsAction {
  type: typeof SET_CONVERSATIONS_STATE;
  payload: ConversationsDataState;
}

export const ADD_CONVERSATION = "ADD_CONVERSATION";
interface AddConversationAction {
  type: typeof ADD_CONVERSATION;
  folderId?: number; // Allow undefined for conversations outside folders
  payload: Conversation;
}

export const UPDATE_CONVERSATION = "UPDATE_CONVERSATION";
export interface UpdateConversationAction {
  type: typeof UPDATE_CONVERSATION;
  payload: Conversation;
}

export const RESET_CONVERSATION = "RESET_CONVERSATION";
export interface ResetConversationAction {
  type: typeof RESET_CONVERSATION;
  payload: Conversation;
}

export const DELETE_CONVERSATION = "DELETE_CONVERSATION";
interface DeleteConversationAction {
  type: typeof DELETE_CONVERSATION;
  payload: Conversation;
}

//  MESSAGES
// ============================================================================
export const ADD_MESSAGE = "ADD_MESSAGE";
export interface AddMessageAction {
  type: typeof ADD_MESSAGE;
  conversation: Conversation;
  payload: StatusChatMessage;
}

export const EDIT_MESSAGE = "EDIT_MESSAGE";
export interface EditMessageAction {
  type: typeof EDIT_MESSAGE;
  conversation: Conversation;
  payload: StatusChatMessage;
}

// ----------------------------------------------------------------------------

export type ConversationActionTypes =
  | AddFolderAction
  | DeleteFolderAction
  | UpdateFolderAction
  | ResetFoldersAction
  | AddConversationAction
  | UpdateConversationAction
  | ResetConversationAction
  | DeleteConversationAction
  | SetConversationsAction
  | AddMessageAction
  | EditMessageAction;
