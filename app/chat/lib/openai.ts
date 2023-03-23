import {
  CHAT_GPT_MODEL,
  GPT4_MODEL,
  GPT4_0314_MODEL,
  GPT4_32K_MODEL,
  GPT4_32K_0314_MODEL,
  DAVINCI_MODEL,
  ADA_MODEL,
  BABBAGE_MODEL,
  CURIE_MODEL,
} from "#/app/chat/lib/constants";

// ============================================================================
//  OPENAI API
// ============================================================================

//  ENUMS
// ============================================================================

export type GptRole = "assistant" | "user" | "system";

export type OpenAiCompletionModel =
  | typeof DAVINCI_MODEL
  | typeof BABBAGE_MODEL
  | typeof CURIE_MODEL
  | typeof ADA_MODEL;

export type OpenAiChatModel =
  | typeof CHAT_GPT_MODEL
  | typeof GPT4_MODEL
  | typeof GPT4_0314_MODEL
  | typeof GPT4_32K_MODEL
  | typeof GPT4_32K_0314_MODEL;

export type OpenAiModel = OpenAiCompletionModel | OpenAiChatModel;

//  META
// ============================================================================
export type OpenAiModelResponse = {
  data: {
    id: OpenAiChatModel;
    object: "model";
    owned_by: "organization-owner";
    // permission: [...]
  }[];
  obejct: "list";
};

export type GptMessage = {
  role: GptRole;
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
  choices: OpenAiChatResponseChoice[];
};

type OpenAiChatResponseChoice = {
  index: number;
  message: GptMessage;
  finish_reason: "length"; // Could be other reasons
};
