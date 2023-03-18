"use client";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Language } from "#/lib/types";

type LanguageContextType = {
  setSelectedLanguage: Dispatch<SetStateAction<Language>>;
  selectedLanguage: Language;
};

export const LanguageContext = createContext<LanguageContextType>({
  setSelectedLanguage: () => {},
  selectedLanguage: "English",
});

export const LanguageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("English" as Language);

  const value = {
    selectedLanguage,
    setSelectedLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error(`useLanguage must be used within a LanguageContextProvider.`);
  }
  return context;
};
