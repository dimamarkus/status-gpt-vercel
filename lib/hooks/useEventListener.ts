import React, { useEffect, useRef } from "react";

type EventHandler = (event: Event) => void;

export const useEventListener = (
  type: string,
  handler: EventHandler,
  el: Window | HTMLElement | Document = window,
): void => {
  const savedHandler = useRef<EventHandler | null>(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e: Event) => savedHandler.current && savedHandler.current(e);

    el.addEventListener(type, listener);

    return () => {
      el.removeEventListener(type, listener);
    };
  }, [type, el]);
};
