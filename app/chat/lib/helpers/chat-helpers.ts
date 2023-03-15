import { SUGGESTIONS_REQUEST } from "#/app/chat/lib/constants";
import { collateBotTraining } from "#/app/chat/lib/helpers/training-helpers";
import { GptMessage } from "#/app/chat/lib/openai";
import { BOT_TRAINING_ORDER } from "#/lib/constants/settings";
import { StatusChatMessage } from "#/lib/types";
import {
  Bot,
  BotTraining,
  BotTrainingMap,
  CmsMultiRelation,
  CmsSingleRelation,
} from "#/lib/types/cms";

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
  const messageQuery = [...messages, createChatUserMessage(SUGGESTIONS_REQUEST)];

  return messageQuery;
};

export const getStartingChatLog = (bot?: Bot | null): StatusChatMessage[] | null => {
  if (!bot) return null;

  const trainingContent = collateBotTraining(bot);
  const trainingMessage = createChatSystemMessage(trainingContent);
  const startingChatLog = [trainingMessage, createChatBotMessage(bot.welcome_message || "")];

  return startingChatLog;
};
