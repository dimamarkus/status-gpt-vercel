import { useEffect, useRef } from "react";

// Put the ref on the element you want to detect clicks outside of
// When clicking outside of the element, the callback will be called
export const useOutsideClick = <T extends HTMLElement>(callback: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as T)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [callback, ref]);

  return ref;
};

/**
 * Usage:
 *
 *    const ref = useOutsideClick(() => doSomething());
 *
 *    return (
 *      <input ref={ref} />
 *    )
 *
 */
