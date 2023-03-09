import { useWindowSize } from '#/lib/hooks/useWindowSize';
import { createContext, useContext } from 'react';

export const useIsMobile = () => {
  const isSsrMobile = useContext(IsSsrMobileContext);
  const { width: windowWidth } = useWindowSize();
  const isBrowserMobile = !!windowWidth && windowWidth < 768;

  return isSsrMobile || isBrowserMobile;
};

export const useIsTablet = () => {
  const isSsrMobile = useContext(IsSsrMobileContext);
  const { width: windowWidth } = useWindowSize();
  const isBrowserMobile = !!windowWidth && windowWidth < 1024;

  return isSsrMobile || isBrowserMobile;
};

export const IsSsrMobileContext = createContext(false);
