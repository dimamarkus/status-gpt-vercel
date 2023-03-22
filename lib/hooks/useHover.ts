import React, { useState, useCallback, useRef } from "react";

type UseHoverReturn = [(node: HTMLElement | null) => void, boolean];

export const useHover = (): UseHoverReturn => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const handleMouseOver = useCallback(() => setIsHovering(true), []);
  const handleMouseOut = useCallback(() => setIsHovering(false), []);
  const nodeRef = useRef<HTMLElement | null>(null);
  const callbackRef = useCallback(
    (node: HTMLElement | null) => {
      if (nodeRef.current) {
        nodeRef.current.removeEventListener("mouseover", handleMouseOver);
        nodeRef.current.removeEventListener("mouseout", handleMouseOut);
      }
      nodeRef.current = node;
      if (nodeRef.current) {
        nodeRef.current.addEventListener("mouseover", handleMouseOver);
        nodeRef.current.addEventListener("mouseout", handleMouseOut);
      }
    },
    [handleMouseOver, handleMouseOut],
  );
  return [callbackRef, isHovering];
};
