import { MutableRefObject, useRef } from "react";

export const usePrevious = <T>(value: T): T | undefined => {
  const currentRef = useRef<T>(value);
  const prevRef = useRef<T>();

  if (currentRef.current !== value) {
    prevRef.current = currentRef.current;
    currentRef.current = value;
  }
  return prevRef.current;
};
