'use client';

import { createContext, useContext, useState } from 'react';

export const FullScreenContext = createContext<{
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}>({
  isFullScreen: false,
  toggleFullScreen: () => false,
});

type FullScreenProps = {
  children: any;
};

export const FullScreenContextProvider = ({ children }: FullScreenProps) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  return (
    <FullScreenContext.Provider
      value={{
        isFullScreen,
        toggleFullScreen: () => setIsFullScreen(!isFullScreen),
      }}
    >
      {children}
    </FullScreenContext.Provider>
  );
};

export const useFullScreenContext = () => {
  return useContext(FullScreenContext);
};
