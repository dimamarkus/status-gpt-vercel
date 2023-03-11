import { CHAT_GPT_MODEL, DAVINCI_MODEL } from "./constants/gpt-prompt.ts";

export type GptMessage = {
  role: "assistant" | "user" | "system";
  content: string;
};
export type OpenAiCompletionModel = "text-davinci-003" | "babbage" | "curie";
export type OpenAiModel = OpenAiCompletionModel & "gpt-3.5-turbo";

/**------------------------------------------------------------------------
 *  OpenAI Requests
 *------------------------------------------------------------------------**/

export type BaseOpenAiRequest = {
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  max_tokens?: number;
  stream?: boolean;
  n?: number;
};

export type OpenAiCompletionRequest = BaseOpenAiRequest & {
  model: OpenAiCompletionModel;
  prompt: string;
};

export type OpenAiChatRequest = BaseOpenAiRequest & {
  model: "gpt-3.5-turbo";
  messages: GptMessage[];
};

export type OpenAiRequest = OpenAiCompletionRequest | OpenAiChatRequest;

/**------------------------------------------------------------------------
 *  OpenAI Responses
 *------------------------------------------------------------------------**/

type OpenAiCompletionResponseChoice = {
  text: string;
  index: number;
  logprobs: null;
  finish_reason: "length"; // Could be other reasons
};

type OpenAiChatResponseChoice = {
  index: number;
  message: GptMessage;
  finish_reason: "length"; // Could be other reasons
};

type OpenAiUsageDetails = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type BaseOpenAiResponse = {
  id: string;
  created: number;
  usage: OpenAiUsageDetails;
};

export type OpenAiCompletionResponse = BaseOpenAiResponse & {
  object: "text_completion";
  model: "text-davinci-003";
  choices: OpenAiCompletionResponseChoice[];
};
export type OpenAiChatResponse = BaseOpenAiResponse & {
  object: "chat.completion";
  choices: OpenAiResponseChoice[];
};

export type OpenAiResponse = OpenAiCompletionResponse | OpenAiChatResponse;
