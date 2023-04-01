"use client";
import { ChangeEvent, ChangeEventHandler } from "react";
import { LANGUAGES } from "#/app/chat/lib/constants";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useLanguageContext } from "#/lib/contexts/LanguageContext";
import { Language } from "#/lib/types";

type LanguageSelectProps = {
  className?: string;
};

export const LanguageSelect = (props: LanguageSelectProps) => {
  const { selectedLanguage, setSelectedLanguage } = useLanguageContext();
  const { getAnswer } = useChatContext();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value as Language);
    getAnswer(`Please answer only in ${e.target.value} from now.`);
  };

  return (
    <select className="select w-full max-w-xs" onChange={handleChange} value={selectedLanguage}>
      {LANGUAGES.map((language, i) => (
        <option key={i} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelect;
