"use client";
import { DEFAULT_SETTINGS } from "#/lib/constants/settings";
import { useLocalStorage } from "#/lib/hooks/useStorage";
import { Language } from "#/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

export type Font = "sans" | "serif";
export type Layout = "vertical" | "sidebar-left" | "sidebar-right";
export type Theme = "light" | "dark" | "statusAlt1" | "statusAlt2" | "statusAlt3";
export type ResponseLength = 1 | 2 | 3; // short | medium | long

export type BooleanSettings = {
  useStream: boolean;
  autoSubmitSpeech: boolean;
  sidebarRight: boolean;
  darkMode: boolean;
};

export type SelectSettings = {
  language: Language;
  responseLength: ResponseLength;
};

export type Settings = BooleanSettings & SelectSettings;

type SettingsContextType = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  areSettingsShown: boolean;
  toggleShowSettings: () => void;
};

export const DEFAULT_SETTINGS_CONTEXT = {
  settings: DEFAULT_SETTINGS,
  setSettings: () => false,
  areSettingsShown: false,
  toggleShowSettings: () => false,
};

export const SettingsContext = createContext<SettingsContextType>(DEFAULT_SETTINGS_CONTEXT);

type SettingsProps = {
  children: any;
};

export const SettingsContextProvider = (props: SettingsProps) => {
  const { children } = props;
  const [areSettingsShown, setOptionsShown] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [storage, setStorage] = useLocalStorage<Settings>("settings", DEFAULT_SETTINGS);

  useEffect(() => {
    if (storage) {
      setSettings(storage);
    }
  }, [storage]);

  const handleSetSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    setStorage(newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings: handleSetSettings,
        areSettingsShown,
        toggleShowSettings: () => setOptionsShown(!areSettingsShown),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  return useContext(SettingsContext);
};
