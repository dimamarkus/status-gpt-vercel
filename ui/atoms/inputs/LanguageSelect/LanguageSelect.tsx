"use client";
import { LANGUAGES } from "#/app/chat/lib/constants";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useSettingsContext } from "#/lib/contexts/SettingsContext";
import { Language } from "#/lib/types";
import clsx from "clsx";
import { ChangeEvent } from "react";

type LanguageSelectProps = {
  className?: string;
};

export const LanguageSelect = ({ className }: LanguageSelectProps) => {
  const { settings, setSettings } = useSettingsContext();
  const { getAnswer } = useChatContext();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSettings({
      ...settings,
      language: e.target.value as Language,
    });
    getAnswer(`Please answer only in ${e.target.value} from now.`);
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
