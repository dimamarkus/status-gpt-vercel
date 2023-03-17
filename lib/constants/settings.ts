import { CHAT_GPT_MODEL, DAVINCI_MODEL } from "#/app/chat/lib/constants";
import { BaseOpenAiRequest, OpenAiModel } from "#/app/chat/lib/openai";
import { Font, Layout, Theme } from "#/lib/contexts/FeatureToggleContext";
import { Bot, BotTrainingMap } from "#/lib/types/cms";

export const DEFAULT_SIDEBAR = "sidebar-pane";

export const MODELS = [CHAT_GPT_MODEL, DAVINCI_MODEL] as OpenAiModel[];
export const LAYOUTS: Layout[] = ["vertical", "sidebar-left", "sidebar-right"];
export const THEMES: Theme[] = ["light", "dark", "statusAlt1", "statusAlt2", "statusAlt3"];
export const FONTS: Font[] = [
  "sans",
  "serif",

  // "graphik",
  // "tiempos",
  // "tiemposHeadline",

  // "avenir",
  // "exo",
  // "inter",
  // "lato",
  // "raleway",
  // "montserrat",
];

export const DEFAULT_FEATURES = {
  font: "sans" as Font,
  layout: "veritcal" as Layout,
  theme: "light" as Theme,
  model: CHAT_GPT_MODEL as OpenAiModel,
  debugMode: false,
  useStream: true,
};

export const DEFAULT_CHAT_BOT: Bot["slug"] = "stat";

export const CHAT_BOT_INPUT_MAX_CHARS = 1000;

export const DEFAULT_GPT_SETTINGS: BaseOpenAiRequest = {
  model: CHAT_GPT_MODEL as OpenAiModel,
  temperature: 0.5,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  max_tokens: 300,
  n: 1,
  stream: true,
};

export const BOT_TRAINING_ORDER: (keyof BotTrainingMap)[] = [
  "syntax",
  "contents",
  "style",
  "intentions",
  "promotions",
  "training",
  "userInfo",
  "json_training",
];
