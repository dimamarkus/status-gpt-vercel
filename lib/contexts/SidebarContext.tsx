'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type Sidebar = JSX.Element | null;

export const DEFAULT_SIDEBAR_CONTEXT = {
  sidebar: null,
  setSidebar: () => null,
};

export const SidebarContext = createContext<{
  sidebar: JSX.Element | null;
  setSidebar: Dispatch<SetStateAction<Sidebar>>;
}>(DEFAULT_SIDEBAR_CONTEXT);

type FullScreenProps = {
  children: any;
};

export const SidebarContextProvider = ({ children }: FullScreenProps) => {
  const [sidebar, setSidebar] = useState<Sidebar>(null);
  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
