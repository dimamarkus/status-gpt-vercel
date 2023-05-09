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
    <label className={ clsx("label flex flex-col items-start", className) }>
      <span className="label-text mb-2 text-[12.5px] font-light text-neutral-content">
        Bot Language
      </span>
      <select
        className={"select select-sm w-full max-w-xs dark:text-white leading-none"}
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
