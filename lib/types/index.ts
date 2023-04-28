import { GptMessage } from "#/app/chat/lib/types";

export type ElementProps = {
  className?: string;
};
export interface ResponseError extends Error {
  status: number;
  statusText?: string;
}

export type CommonSizes = "xs" | "sm" | "md" | "lg" | "xl";

export type CommonSpacings = CommonSizes | "none" | "full";

export type Language =
  | "Arabic"
  | "Chinese"
  | "English"
  | "French"
  | "Greek"
  | "Spanish"
  | "Russian"
