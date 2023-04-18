"use client";
import { LANGUAGES } from "#/app/chat/lib/constants";
import { useSettingsContext } from "#/lib/contexts/SettingsContext";
import { Language } from "#/lib/types";
import clsx from "clsx";
import { ChangeEvent } from "react";

type LanguageSelectProps = {
  className?: string;
};

export const LanguageSelect = ({ className }: LanguageSelectProps) => {
  const { settings, setSettings } = useSettingsContext();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSettings({
      ...settings,
      language: e.target.value as Language,
    });
  };

  return (
    <label className="label flex flex-col items-start">
      <span className="label-text mb-2">Bot Language</span>
      <select
        className={clsx("select w-full max-w-xs dark:text-white")}
        onChange={handleChange}
        value={settings.language}
      >
        {LANGUAGES.map((language, i) => (
          <option key={i} value={language}>
            {language}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSelect;
