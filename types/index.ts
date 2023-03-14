import { GptMessage } from "#/features/chat/openai";

export type StatusChatMessage = GptMessage & {
  timestamp: number;
};

export type CommonSizes = "xs" | "sm" | "md" | "lg" | "xl";
