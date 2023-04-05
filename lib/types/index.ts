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
  | "English"
  | "Arabic"
  | "Spanish"
  | "French"
  | "Russian"
  | "Klingon"
  | "Pig Latin";
