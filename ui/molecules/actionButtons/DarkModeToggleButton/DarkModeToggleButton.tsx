"use client";

import { useSettingsContext } from "#/lib/contexts/SettingsContext";
import MoonSun from "#/ui/atoms/decorations/MoonSun/MoonSun";
import clsx from "clsx";
import { useState } from "react";

type DarkModeToggleProps = {
  className?: string;
};

export const DarkModeToggle = ({ className }: DarkModeToggleProps) => {
  const { settings, setSettings } = useSettingsContext();
  const { darkMode } = settings;

  const handleSetDarkMode = () => {
    setSettings({ ...settings, darkMode: !darkMode });
  };

  return (
    <MoonSun
      darkMode={darkMode}
      onClick={handleSetDarkMode}
      className={clsx("ml-2 p-2 opacity-50", className)}
    />
  );
};
export default DarkModeToggle;
