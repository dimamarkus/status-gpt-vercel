import { OpenAiChatModel, OpenAiCompletionModel } from "#/app/chat/lib/openai";
import { Language, StatusChatMessage } from "#/lib/types";

export const LANGUAGES: Language[] = ["English", "Spanish", "French", "Russian"];

//  ENDPOINTS
// ============================================================================
export const GPT_MODELS_URL = "https://api.openai.com/v1/models";
export const GPT_CHAT_URL = "https://api.openai.com/v1/chat/completions";
export const GPT_COMPLETIONS_URL = "https://api.openai.com/v1/completions";

//  PROMPTS
// ============================================================================
export const EXAMPLE_PROMPTS = [
  "Where can I plan my future?",
  "How much should I be saving each month to reach my retirement goals?",
  "How much do I need to have saved by retirement age to maintain my current lifestyle?",
  "What tax implications should I consider when planning my retirement?",
  "What investments should I consider to maximize my retirement savings?",
];

export const SUGGESTIONS_REQUEST = `Given our discussion, suggest 3 questions you think I should ask you (Stat) as follow up. Make them in the form of a JavaScript array of question strings with no other characters besides that whatsoever. For example: ["What is your name?", "What is your favorite food?"]`;
export const DEBUG_SUGGESTIONS = [
  "Reply with one word",
  "What are 5 helpful websites for financial advice?",
];

//  AI MODELS
// ============================================================================

//  Completion
// ----------------------------------------------------------------------------
export const DAVINCI_MODEL = "text-davinci-003";
export const BABBAGE_MODEL = "text-babbage-001";
export const CURIE_MODEL = "text-curie-001";
export const ADA_MODEL = "text-ada-001";
export const COMPLETION_MODELS: OpenAiCompletionModel[] = [
  DAVINCI_MODEL,
  BABBAGE_MODEL,
  CURIE_MODEL,
  ADA_MODEL,
];

//  Chat
// ----------------------------------------------------------------------------
export const CHAT_GPT_MODEL = "gpt-3.5-turbo";
export const GPT4_MODEL = "gpt-4";
export const GPT4_0314_MODEL = "gpt-4-0314";
export const GPT4_32K_MODEL = "gpt-4-32k";
export const GPT4_32K_0314_MODEL = "gpt-4-32k-0314";
export const CHAT_MODELS: OpenAiChatModel[] = [
  CHAT_GPT_MODEL,
  GPT4_MODEL,
  GPT4_0314_MODEL,
  GPT4_32K_MODEL,
  GPT4_32K_0314_MODEL,
];
