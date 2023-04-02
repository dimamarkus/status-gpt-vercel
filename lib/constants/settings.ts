import { ADA_MODEL, GPT3_MODEL, DAVINCI_MODEL } from "#/app/chat/lib/constants";
import { BaseOpenAiRequest, OpenAiModel, OpenAiRequest } from "#/app/chat/lib/types";
import { Font, Layout, Theme } from "#/lib/contexts/FeatureToggleContext";
import { Bot, BotTrainingMap } from "#/lib/types/cms";

export const DEFAULT_SIDEBAR = "sidebar-pane";

export const MODELS = [GPT3_MODEL, DAVINCI_MODEL, ADA_MODEL] as OpenAiModel[];
export const LAYOUTS: Layout[] = ["vertical", "sidebar-left", "sidebar-right"];
export const THEMES: Theme[] = ["light", "dark", "statusAlt1", "statusAlt2", "statusAlt3"];
export const FONTS: Font[] = ["sans", "serif"];

export const DEFAULT_FEATURES = {
  font: "sans" as Font,
  layout: "veritcal" as Layout,
  theme: "light" as Theme,
  model: GPT3_MODEL as OpenAiModel,
  debugMode: false,
  useStream: true,
  autoSubmitSpeech: false,
  enableAssumptions: false,
  enableSuggestions: false,
  enableSubmissions: false,
  showTokens: false,
};

export const DEFAULT_CHAT_BOT: Bot["slug"] = "stat";

export const CHAT_BOT_INPUT_MAX_CHARS = 1000;

export const DEFAULT_BOT_MEMORY = 6;

export const DEFAULT_SUGGESTIONS_MODEL: OpenAiModel = ADA_MODEL as OpenAiModel;
export const DEFAULT_SUGGESTIONS_MEMORY = 3;

export const SUGGESTIONS_PROMPT_SIZE: OpenAiModel = ADA_MODEL as OpenAiModel;
export const SUBMISSIONS_PROMPT_SIZE = 3;

export const DEFAULT_GPT_SETTINGS: OpenAiRequest = {
  model: GPT3_MODEL as OpenAiModel,
  temperature: 0.5,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  max_tokens: 300,
  n: 1,
  stream: true,
  messages: [],
  prompt: "",
};

export const BOT_TRAINING_ORDER: (keyof BotTrainingMap)[] = [
  "syntax",
  "general_training",
  "training",
  "contents",
  "intentions",
  "promotions",
  "styles",
  "triggers",
  "custom_triggers",
  "json_training",
  "userInfo",
];
