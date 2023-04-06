"use client";

import { useSettingsContext } from "#/lib/contexts/SettingsContext";
import MoonSun from "#/ui/atoms/decorations/MoonSun/MoonSun";
import { useState } from "react";

type DarkModeToggleProps = {
  darkMode?: boolean;
  onClick?: () => void;
};

export const DarkModeToggle = (props: DarkModeToggleProps) => {
  const { settings, setSettings } = useSettingsContext();
  const { darkMode } = settings;

  const handleSetDarkMode = () => {
    setSettings({ ...settings, darkMode: !darkMode });
  };

  return (
    <MoonSun darkMode={darkMode} onClick={handleSetDarkMode} className="ml-2 p-2 opacity-50" />
  );
};
export default DarkModeToggle;
