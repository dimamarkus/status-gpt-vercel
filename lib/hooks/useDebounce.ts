import { useTimeout } from "#/lib/hooks/useTimeout";
import { useEffect } from "react";

export const useDebounce = (callback: () => void, delay: number, dependencies: any[]): void => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, reset]);
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
