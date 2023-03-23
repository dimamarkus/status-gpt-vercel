"use client";
import { OpenAiModel } from "#/app/chat/lib/openai";
import { DEFAULT_FEATURES } from "#/lib/constants/settings";
import { useLocalStorage } from "#/lib/hooks/useStorage";
import { createContext, useContext, useEffect, useState } from "react";

export type Font = "sans" | "serif";
export type Layout = "vertical" | "sidebar-left" | "sidebar-right";
export type Theme = "light" | "dark" | "statusAlt1" | "statusAlt2" | "statusAlt3";

export type BooleanFeatures = {
  debugMode: boolean;
  useStream: boolean;
  autoSubmitSpeech: boolean;
  enableSuggestions: boolean;
  enableSubmissions: boolean;
  showTokens: boolean;
};

export type SelectFeatures = {
  font: Font;
  layout: Layout;
  theme: Theme;
  model: OpenAiModel;
};

export type Features = BooleanFeatures & SelectFeatures;

type ToggleContextType = {
  features: Features;
  setFeatures: (features: Features) => void;
  areFeaturesShown: boolean;
  toggleShowFeatures: () => void;
};

export const DEFAULT_FEATURE_CONTEXT = {
  features: DEFAULT_FEATURES,
  setFeatures: () => false,
  areFeaturesShown: false,
  toggleShowFeatures: () => false,
};

export const FeatureToggleContext = createContext<ToggleContextType>(DEFAULT_FEATURE_CONTEXT);

type FeatureToggleProps = {
  children: any;
};

export const FeatureToggleContextProvider = (props: FeatureToggleProps) => {
  const { children } = props;
  const [areFeaturesShown, setOptionsShown] = useState<boolean>(false);
  const [features, setFeatures] = useState<Features>(DEFAULT_FEATURES);
  const [storage, setStorage] = useLocalStorage<Features>("features", DEFAULT_FEATURES);

  useEffect(() => {
    if (storage) {
      setFeatures(storage);
    }
  }, [storage]);

  const handleSetFeatures = (newFeatures: Features) => {
    setFeatures(newFeatures);
    setStorage(newFeatures);
  };

  return (
    <FeatureToggleContext.Provider
      value={{
        features,
        setFeatures: handleSetFeatures,
        areFeaturesShown,
        toggleShowFeatures: () => setOptionsShown(!areFeaturesShown),
      }}
    >
      {children}
    </FeatureToggleContext.Provider>
  );
};

export const useFeatureToggleContext = () => {
  return useContext(FeatureToggleContext);
};
