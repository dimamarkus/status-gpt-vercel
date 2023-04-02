import { getBotParam } from "#/app/chat/lib/helpers/bot-helpers";
import { calculateTokens, isChatModel } from "#/app/chat/lib/helpers/chat-helpers";
import { USER_INPUT_FIELD_ID } from "#/app/chat/lib/hooks/useChatGpt";
import { event as GAEvent } from "nextjs-google-analytics";
import {
  OpenAiChatResponse,
  OpenAiCompletionResponse,
  OpenAiModel,
  OpenAiResponse,
} from "#/app/chat/lib/types";
import { StatusChatMessage } from "#/app/chat/lib/types";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useRequestStream } from "#/lib/hooks/useRequestStream";
import { Bot } from "#/lib/types/cms";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { ChatFormFields } from "#/ui/modules/Chat/ChatInput/ChatInput";

export type UseChatSidebarReturn = {
  sidebarState: SidebarState;
  toggleSidebarSection: (section: keyof SidebarState) => void;
  setSidebarSectionState: (section: keyof SidebarState, state: boolean) => void;
  closeAllSections: () => void;
};

export type SidebarState = {
  suggestions: boolean;
  settings: boolean;
  conversations: boolean;
  botSettings: boolean;
  assumptions: boolean;
  stats: boolean;
  admin: boolean;
};

export const INITIAL_SIDEBAR_STATE: SidebarState = {
  conversations: true,
  suggestions: false,
  settings: false,
  botSettings: false,
  assumptions: false,
  stats: false,
  admin: false,
};

export const useChatSidebar = (): UseChatSidebarReturn => {
  const [sidebarState, setSidebarState] = useState<SidebarState>(INITIAL_SIDEBAR_STATE);

  const toggleSidebarSection = (section: keyof SidebarState) => {
    setSidebarState((state) => ({
      ...INITIAL_SIDEBAR_STATE,
      [section]: !state[section],
    }));
  };

  const setSidebarSectionState = (section: keyof SidebarState, state: boolean) => {
    setSidebarState((prevState) => ({
      ...prevState,
      [section]: state,
    }));
  };

  const closeAllSections = () => {
    setSidebarState(INITIAL_SIDEBAR_STATE);
  };

  return {
    sidebarState,
    toggleSidebarSection,
    setSidebarSectionState,
    closeAllSections,
  };
};
