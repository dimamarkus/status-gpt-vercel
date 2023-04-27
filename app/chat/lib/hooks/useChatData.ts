import {
  ADD_CONVERSATION,
  ADD_FOLDER,
  ADD_MESSAGE,
  DELETE_CONVERSATION,
  DELETE_FOLDER,
  EDIT_MESSAGE,
  RESET_FOLDERS,
  SET_CONVERSATIONS_STATE,
  UPDATE_CONVERSATION,
  UPDATE_FOLDER,
} from "#/app/chat/lib/actions";
import { generateEmptyConversation, getStartingChatLog } from "#/app/chat/lib/helpers/chat-helpers";
import { exportConversationData } from "#/app/chat/lib/helpers/converastion-helpers";
import { ConversationsDataState, useConversationsReducer } from "#/app/chat/lib/reducer";
import { Conversation, ConversationsFolder, StatusChatMessage } from "#/app/chat/lib/types";
import { BotConversations } from "#/lib/contexts/ChatContext";
import { useLocalStorage } from "#/lib/hooks/useStorage";
import useUpdateEffect from "#/lib/hooks/useUpdateEffect";
import { Bot } from "#/lib/types/cms";
import { useEffect } from "react";
import mongoClientPromise from "#/lib/databases/mongodb";
import { STARTING_CONVERSATION_LENGTH } from "#/app/chat/lib/constants";

export interface UseConversationsDataReturn {
  state: ConversationsDataState & {
    bot: Bot | null;
  };
  actions: {
    addFolder: (folderName: string) => void;
    updateFolder: (folder: ConversationsFolder) => void;
    deleteFolder: (folderId: number) => void;
    resetFolders: () => void;
    addConversation: () => Conversation;
    updateConversation: (conversation: Conversation) => void;
    deleteConversation: (conversation: Conversation) => void;
    resetConversation: (conversation: Conversation) => void;
    setConversations: (data: ConversationsDataState) => void;
    addMessage: (conversation: Conversation, message: StatusChatMessage) => void;
    editMessage: (conversation: Conversation, message: StatusChatMessage) => void;
    exportConversations: () => void;
  };
}

export const useChatData = (bot: Bot | null): UseConversationsDataReturn => {
  const { state, dispatch } = useConversationsReducer();

  // Bind local storage to state
  const [localStorage, setLocalStorage] = useLocalStorage<BotConversations>("conversations", {});

  // Use bot slug as key or use "unknown" as default
  const botKey = bot?.slug || "unknown";
  const storedData = localStorage?.[botKey];

  // Set locally stored conversations to state if they exist
  useEffect(() => {
    storedData && actions.setConversations(storedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save conversations to local storage everytime they change
  useUpdateEffect(() => {
    setLocalStorage({ ...localStorage, [botKey]: state });
  }, [state]);

  // Compile all state-related actions into shortcut functions
  const actions: UseConversationsDataReturn["actions"] = {
    addFolder: () => dispatch({ type: ADD_FOLDER }),
    updateFolder: (payload) => dispatch({ type: UPDATE_FOLDER, payload }),
    deleteFolder: (folderId) => dispatch({ type: DELETE_FOLDER, folderId }),
    resetFolders: () => {
      dispatch({ type: RESET_FOLDERS });
      dispatch({ type: ADD_CONVERSATION, payload: generateEmptyConversation(bot) });
    },
    setConversations: (payload) => dispatch({ type: SET_CONVERSATIONS_STATE, payload }),
    updateConversation: (payload) => dispatch({ type: UPDATE_CONVERSATION, payload }),
    deleteConversation: (payload) => dispatch({ type: DELETE_CONVERSATION, payload }),
    resetConversation: (conversation) => {
      const payload = { ...conversation, messages: getStartingChatLog(bot) } as Conversation;
      dispatch({ type: UPDATE_CONVERSATION, payload });
    },
    addConversation: () => {
      const payload = generateEmptyConversation(bot);
      dispatch({ type: ADD_CONVERSATION, payload });
      return payload;
    },
    addMessage: (conversation, payload) => dispatch({ type: ADD_MESSAGE, conversation, payload }),
    editMessage: (conversation, payload) => dispatch({ type: EDIT_MESSAGE, conversation, payload }),
    exportConversations: () => !!bot && exportConversationData(bot),
  };

  return { state: { ...state, bot }, actions };
};
