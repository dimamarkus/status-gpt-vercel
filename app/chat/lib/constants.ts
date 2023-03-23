import { OpenAiChatModel, OpenAiCompletionModel, OpenAiModel } from "#/app/chat/lib/openai";
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

export const SUBMISSIONS_REQUEST = `Given your last reply, if theres any numerical information you asked for from the me, please reply with a flat json object I can fill out. Set all values to null. Do not write anything whatsoever besides that json object. The first character of your reply should be "{" and the last should be" }"`;
export const DEFAULT_SUBMISSIONS = {};
export const SUGGESTIONS_REQUEST = `Given our discussion, suggest 3 short questions you think I should ask you (Stat) as follow up. Make them in the form of a JavaScript array of question strings with no other characters besides that whatsoever. For example: ["What is your name?", "What is your favorite food?"]`;
export const DEBUG_SUGGESTIONS = [
  "Reply with one word",
  "What are 5 helpful websites for financial advice?",
  "Give me a succinct list of 3 pieces of info you could use from me.",
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
export const GPT3_MODEL = "gpt-3.5-turbo";
export const GPT4_MODEL = "gpt-4";
export const GPT4_0314_MODEL = "gpt-4-0314";
export const GPT4_32K_MODEL = "gpt-4-32k";
export const GPT4_32K_0314_MODEL = "gpt-4-32k-0314";
export const CHAT_MODELS: OpenAiChatModel[] = [
  GPT3_MODEL,
  GPT4_MODEL,
  GPT4_0314_MODEL,
  GPT4_32K_MODEL,
  GPT4_32K_0314_MODEL,
];

export const EXAMPLE_CHAT_MESSAGE: StatusChatMessage = {
  role: "user",
  content: "Hello world!",
  timestamp: Date.now(),
  tokens: 3,
};

// https://openai.com/pricing
type OPENAI_MODEL_COST = { prompt: number; completion: number };
export const CHAT_COSTS: Record<OpenAiModel, OPENAI_MODEL_COST> = {
  [GPT4_MODEL]: { prompt: 0.00003, completion: 0.00006 },
  [GPT4_0314_MODEL]: { prompt: 0.00003, completion: 0.00006 },
  [GPT4_32K_MODEL]: { prompt: 0.00006, completion: 0.00012 },
  [GPT4_32K_0314_MODEL]: { prompt: 0.00006, completion: 0.00012 },
  [GPT3_MODEL]: { prompt: 0.000002, completion: 0.000002 },
  [DAVINCI_MODEL]: { prompt: 0.00002, completion: 0.00002 },
  [BABBAGE_MODEL]: { prompt: 0.0000005, completion: 0.0000005 },
  [CURIE_MODEL]: { prompt: 0.000002, completion: 0.000002 },
  [ADA_MODEL]: { prompt: 0.0000004, completion: 0.0000004 },
};
