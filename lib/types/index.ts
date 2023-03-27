import { GptMessage } from "#/app/chat/lib/openai";

export interface ResponseError extends Error {
  status: number;
  statusText?: string;
}

export type StatusChatMessage = GptMessage & {
  timestamp: number;
  tokens?: number;
};

export type CommonSizes = "xs" | "sm" | "md" | "lg" | "xl";

export type CommonSpacings = CommonSizes | "none" | "full";

export type Language = "English" | "Spanish" | "French" | "Russian";
