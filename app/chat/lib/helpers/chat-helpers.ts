import {
  CHAT_MODELS,
  EMPTY_CONVERSATION,
  SUBMISSIONS_REQUEST,
  SUGGESTIONS_REQUEST,
} from "#/app/chat/lib/constants";
import { collateBotTraining, getBotParam } from "#/app/chat/lib/helpers/bot-helpers";
import { GptMessage, OpenAiChatModel, OpenAiModel } from "#/app/chat/lib/types";
import { ConversationsDataState } from "#/app/chat/lib/reducer";
import { Conversation, StatusChatMessage } from "#/app/chat/lib/types";
import {
  DEFAULT_BOT_MEMORY,
  DEFAULT_SUGGESTIONS_MEMORY,
  SUBMISSIONS_PROMPT_SIZE,
} from "#/lib/constants/settings";
import { Bot } from "#/lib/types/cms";
import { encode } from "gptoken";
import { ResponseLength } from "#/lib/contexts/SettingsContext";

export const calculateTokens = (prompt: string) => {
  // Will not work on edge runtine
  return encode(prompt).length;
};

export const calculateMaxTokens = (maxTokens: number, responseLength: ResponseLength) => {
  if (responseLength === 1) {
    return 50;
  } else if (responseLength === 2) {
    return maxTokens * 0.5;
  }
  return maxTokens;
};

export const isChatModel = (model?: OpenAiModel) =>
  !!model && CHAT_MODELS.includes(model as OpenAiChatModel);

export const createChatMessage = (
  role: GptMessage["role"],
  content: GptMessage["content"],
  withTokens?: boolean,
): StatusChatMessage => ({
  role,
  content,
  timestamp: Date.now(),
  tokens: withTokens ? calculateTokens(content) : undefined,
});

export const createSuggestionsPrompt = (context: StatusChatMessage[]) => {
  const recentMessages =
    context.length > DEFAULT_SUGGESTIONS_MEMORY
      ? context.slice(DEFAULT_SUGGESTIONS_MEMORY)
      : context;
  const messages = recentMessages.map(({ role, content }) => ({ role, content }));
  const messageQuery = [...messages, { role: "user", content: SUGGESTIONS_REQUEST } as GptMessage];

  return messageQuery;
};

export const createSubmissionsPrompt = (context: StatusChatMessage[]) => {
  const recentMessages =
    context.length > SUBMISSIONS_PROMPT_SIZE ? context.slice(SUBMISSIONS_PROMPT_SIZE) : context;
  const messages = recentMessages.map(({ role, content }) => ({ role, content }));
  const messageQuery = [...messages, { role: "user", content: SUBMISSIONS_REQUEST } as GptMessage];

  return messageQuery;
};

export const getStartingChatLog = (bot?: Bot | null): StatusChatMessage[] | [] => {
  if (!bot) return [];

  const trainingContent = collateBotTraining(bot);
  const trainingMessage = createChatMessage("system", trainingContent);
  const startingChatLog = [
    trainingMessage,
    createChatMessage("assistant", bot.welcome_message || ""),
  ];

  return startingChatLog;
};

export const filterConversationsData = (
  data: ConversationsDataState,
  searchQuery: string,
): ConversationsDataState => {
  const { folders, rootConversations } = data;
  const filteredFolders = folders.filter(
    (folder) => filterConversations(folder.conversations, searchQuery).length > 0,
  );
  const filteredRootConversations = filterConversations(rootConversations, searchQuery);
  return { folders: filteredFolders, rootConversations: filteredRootConversations };
};

export const filterConversations = (
  conversations: Conversation[],
  searchQuery: string,
): Conversation[] => {
  return conversations.filter((conversation) => {
    const searchable =
      conversation.name.toLocaleLowerCase() +
      " " +
      conversation.messages.map((message) => message.content).join(" ");
    return searchable.toLowerCase().includes(searchQuery.toLowerCase());
  });
};

export const generateEmptyConversation = (bot?: Bot | null): Conversation => ({
  ...EMPTY_CONVERSATION,
  id: Date.now(),
  messages: getStartingChatLog(bot),
});

export const compileChatMessages = (
  messages: StatusChatMessage[] | null,
  prompt: string,
  memory?: number,
): {
  /**
   * The system training message along with a slice of the most recent messages.
   * The slice is controlled by the CHAT_MEMORY setting
   * Timestamps are stripped from the messages to accomodate the OpenAI API.
   */
  toSend: GptMessage[];
  /**
   * An array of all the messages that have been sent and received in the chat.
   * Chat log is null if no bot can be found.
   */
  all: StatusChatMessage[];
} => {
  const sliceLength = memory || DEFAULT_BOT_MEMORY;
  const overLimit = messages && messages.length > sliceLength;

  // Sanitize the input and create the latest message from the user
  const containsPunctuation = !!prompt && /[.;!?]$/.test(prompt);
  const content = containsPunctuation ? prompt : `${prompt}.`;
  const latestMessage = createChatMessage("user", content);

  // Create slice of the chat history to send as a prompt to OpenAI.
  const recentMessages = overLimit ? messages.slice(1).slice(-sliceLength) : messages;
  const messagesWithTimestamps: StatusChatMessage[] = [...(recentMessages || []), latestMessage];

  // Prep the OpenAI request messages by removing the timestamps from the Chat History slice
  const toSend = messagesWithTimestamps
    .map(({ role, content }) => ({ role, content }))
    // Remove any Training messages to avoid exposing them. It shoudl be put back server-side.
    .filter(({ role }) => role !== "system");

  // Add the latest message to the master chat log of all messages
  const allChatMessages: StatusChatMessage[] = [...(messages || []), latestMessage];

  return {
    toSend,
    all: allChatMessages,
  };
};
