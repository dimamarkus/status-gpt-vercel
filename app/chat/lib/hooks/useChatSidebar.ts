import {useState} from "react";

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
      ...state,
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
