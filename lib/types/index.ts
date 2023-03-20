import { GptMessage } from "#/app/chat/lib/openai";

export type StatusChatMessage = GptMessage & {
  timestamp: number;
};

export type CommonSizes = "xs" | "sm" | "md" | "lg" | "xl";

export type CommonSpacings = CommonSizes | "none" | "full";

export type Language = "English" | "Spanish" | "French" | "Russian";
