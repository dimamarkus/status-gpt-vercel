import clsx from "clsx";
import React from "react";

type OverlayProps = {
  className?: React.ReactNode;
};

export const Overlay = ({ className }: OverlayProps) => {
  const overlayStyles = clsx(
    "fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-black/75 z-2 cursor-pointer",
    className,
  );

  return <div className={overlayStyles} />;
};
export default Overlay;
