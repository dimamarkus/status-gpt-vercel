import { Font, Layout, Model, Theme } from "#/lib/contexts/FeatureToggleContext";

export const DEFAULT_SIDEBAR = "landing-sidebar";

export const DEFAULT_FEATURES = {
  font: "graphik" as Font,
  layout: "veritcal" as Layout,
  theme: "statusLight" as Theme,
  // model: 'davinci' as Model,
  model: "chat-gpt" as Model,
  debugMode: false,
};
