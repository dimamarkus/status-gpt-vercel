"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const LayoutContext = createContext<{
  isFullScreen: boolean;
  toggleFullScreen: () => void;
  sidebarIsVisible: boolean;
  toggleSidebar: () => void;
}>({
  isFullScreen: false,
  toggleFullScreen: () => false,
  sidebarIsVisible: false,
  toggleSidebar: () => false,
});

type FullScreenProps = {
  children: any;
};

export const LayoutContextProvider = ({ children }: FullScreenProps) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [sidebarIsVisible, setIsSidebarVisible] = useState<boolean>(true);

  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsSidebarVisible(false);
    }
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isFullScreen,
        toggleFullScreen: () => setIsFullScreen(!isFullScreen),
        sidebarIsVisible,
        toggleSidebar: () => setIsSidebarVisible(!sidebarIsVisible),
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};
