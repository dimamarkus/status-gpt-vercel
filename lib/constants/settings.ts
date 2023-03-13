import { Font, Layout, Theme } from "#/lib/contexts/FeatureToggleContext";
import { CHAT_GPT_MODEL, DAVINCI_MODEL } from "#/features/chat/constants/gpt-prompt";
import { OpenAiModel } from "#/features/chat/openai";

export const DEFAULT_SIDEBAR = "landing-sidebar";

export const MODELS = [CHAT_GPT_MODEL, DAVINCI_MODEL] as OpenAiModel[];
export const LAYOUTS: Layout[] = ["vertical", "sidebar-left", "sidebar-right"];
export const THEMES: Theme[] = ["light", "dark", "statusLight", "statusDark", "business"];
export const FONTS: Font[] = [
  "sans",
  "serif",

  "graphik",
  "tiempos",
  "tiemposHeadline",

  "avenir",
  "exo",
  "inter",
  "lato",
  "raleway",
  "montserrat",
];

export const DEFAULT_FEATURES = {
  font: "graphik" as Font,
  layout: "veritcal" as Layout,
  theme: "statusLight" as Theme,
  model: CHAT_GPT_MODEL as OpenAiModel,
  debugMode: false,
  useStream: true,
};

export const CHAT_GPT_SETTINGS = {
  temperature: 0.5,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  max_tokens: 300,
  n: 1,
};
