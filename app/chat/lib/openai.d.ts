import { CHAT_GPT_MODEL, DAVINCI_MODEL } from "./constants.ts";

// ============================================================================
//  OPENAI API
// ============================================================================

//  ENUMS
// ============================================================================

export type GptRoles = "assistant" | "user" | "system";

export type OpenAiCompletionModel =
  | "text-davinci-003"
  | "text-babbage-001"
  | "text-curie-001"
  | "text-ada-001";

export type OpenAiChatModel =
  | "gpt-3.5-turbo"
  | "gpt-4"
  | "gpt-4-0314"
  | "gpt-4-32k"
  | "gpt-4-32k-0314";

export type OpenAiModel = OpenAiCompletionModel | OpenAiChatModel;

//  META
// ============================================================================

export type GptMessage = {
  role: GptRoles;
  content: string;
};

type OpenAiUsageDetails = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type BaseOpenAiRequest = {
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  max_tokens?: number;
  stream?: boolean;
  n?: number;
};

export type BaseOpenAiResponse = {
  id: string;
  created: number;
  usage: OpenAiUsageDetails;
};

export type OpenAiRequest = OpenAiCompletionRequest | OpenAiChatRequest;
export type OpenAiResponse = OpenAiCompletionResponse | OpenAiChatResponse;

//  COMPLETIONS - https://platform.openai.com/docs/api-reference/completions
// ----------------------------------------------------------------------------
export type OpenAiCompletionRequest = BaseOpenAiRequest & {
  model: OpenAiCompletionModel;
  prompt: string;
};

type OpenAiCompletionResponseChoice = {
  text: string;
  index: number;
  logprobs: null;
  finish_reason: "length"; // Could be other reasons
};

export type OpenAiCompletionResponse = BaseOpenAiResponse & {
  object: "text_completion";
  model: OpenAiCompletionModel;
  choices: OpenAiCompletionResponseChoice[];
};

// CHAT - https://platform.openai.com/docs/api-reference/chat
// ----------------------------------------------------------------------------
export type OpenAiChatRequest = BaseOpenAiRequest & {
  model: OpenAiChatModel;
  messages: GptMessage[];
};

export type OpenAiChatResponse = BaseOpenAiResponse & {
  object: "chat.completion";
  choices: OpenAiResponseChoice[];
};

type OpenAiChatResponseChoice = {
  index: number;
  message: GptMessage;
  finish_reason: "length"; // Could be other reasons
};
