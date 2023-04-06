import clsx from "clsx";
import React from "react";

type OverlayProps = {
  className?: React.ReactNode;
  onClick?: () => void;
};

export const Overlay = ({ className, onClick }: OverlayProps) => {
  const overlayStyles = clsx(
    "fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-black/75 z-2 cursor-pointer",
    className,
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick && onClick();
  };

  return <div className={overlayStyles} onClick={handleClick} />;
};
export default Overlay;
