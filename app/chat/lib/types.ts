import { GptMessage, OpenAiModel } from "#/app/chat/lib/openai";

export type StatusChatMessage = GptMessage & {
  timestamp: number;
  tokens?: number;
};

