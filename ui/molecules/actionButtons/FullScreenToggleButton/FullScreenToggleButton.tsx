import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import styles from "./FullScreenToggleButton.module.scss";
import { useLayoutContext } from "#/lib/contexts/LayoutContext";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";

export const FullScreenToggleButton = ({ className }: { className?: string }) => {
  const { isFullScreen, toggleFullScreen } = useLayoutContext();

  return (
    <BaseButton
      flavor="icon"
      className={className}
      onClick={() => toggleFullScreen()}
      title={(!isFullScreen ? "Enter" : "Exit") + " Full-screen"}
      icon={
        !isFullScreen ? (
          <ArrowsPointingOutIcon className="h-5 w-5 text-inherit" />
        ) : (
          <ArrowsPointingInIcon className="h-5 w-5 text-inherit" />
        )
      }
    />
  );
};

export default FullScreenToggleButton;
