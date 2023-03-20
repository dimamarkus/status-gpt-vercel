import { CHAT_MODELS, SUBMISSIONS_REQUEST, SUGGESTIONS_REQUEST } from "#/app/chat/lib/constants";
import { collateBotTraining } from "#/app/chat/lib/helpers/training-helpers";
import { GptMessage, OpenAiChatModel, OpenAiModel } from "#/app/chat/lib/openai";
import { DEFAULT_BOT_MEMORY } from "#/lib/constants/settings";
import { StatusChatMessage } from "#/lib/types";
import { Bot } from "#/lib/types/cms";

export const isChatModel = (model: OpenAiModel) => CHAT_MODELS.includes(model as OpenAiChatModel);

export const createChatMessage = (
  role: GptMessage["role"],
  content: GptMessage["content"],
): StatusChatMessage => ({
  role,
  content,
  timestamp: Date.now(),
});

export const createChatSystemMessage = (content: GptMessage["content"]): StatusChatMessage =>
  createChatMessage("system", content);

export const createChatBotMessage = (content: GptMessage["content"]): StatusChatMessage =>
  createChatMessage("assistant", content);

export const createChatUserMessage = (content: GptMessage["content"]): StatusChatMessage =>
  createChatMessage("user", content);

export const createSuggestionsPrompt = (context: StatusChatMessage[]) => {
  const messages = context.map(({ role, content }) => ({ role, content }));
  const messageQuery = [...messages, { role: "user", content: SUGGESTIONS_REQUEST } as GptMessage];

  return messageQuery;
};

export const createSubmissionsPrompt = (context: StatusChatMessage[]) => {
  const messages = context.map(({ role, content }) => ({ role, content }));
  const messageQuery = [...messages, { role: "user", content: SUBMISSIONS_REQUEST } as GptMessage];

  return messageQuery;
};

export const getStartingChatLog = (bot?: Bot | null): StatusChatMessage[] | null => {
  if (!bot) return null;

  const trainingContent = collateBotTraining(bot);
  const trainingMessage = createChatSystemMessage(trainingContent);
  const startingChatLog = [trainingMessage, createChatBotMessage(bot.welcome_message || "")];

  return startingChatLog;
};

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
  const latestMessage = createChatUserMessage(content);

  // Create slice of the chat history to send as a prompt to OpenAI.
  const recentMessages = overLimit ? messages.slice(1).slice(-sliceLength) : messages;
  const messagesWithTimestamps: StatusChatMessage[] = [...(recentMessages || []), latestMessage];

  // Make sure the training message gets put back after the slice
  const trainingMessage = messages ? createChatSystemMessage(messages[0].content) : null;
  overLimit && !!trainingMessage && messagesWithTimestamps.unshift(trainingMessage);

  // Prep the OpenAI request messages by removing the timestamps from the Chat History slice
  const toSend = messagesWithTimestamps.map(({ role, content }) => ({ role, content }));

  // Add the latest message to the master chat log of all messages
  const allChatMessages: StatusChatMessage[] = [...(messages || []), latestMessage];

  return {
    toSend,
    all: allChatMessages,
  };
};
