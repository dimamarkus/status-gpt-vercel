import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import styles from "./FullScreenToggleButton.module.scss";
import { useFullScreenContext } from "#/lib/contexts/FullScreenContext";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";

export const FullScreenToggleButton = ({ className }: { className?: string }) => {
  const { isFullScreen, toggleFullScreen } = useFullScreenContext();

  return (
    <BaseButton
      flavor="icon"
      className={clsx(styles.root, className, "opacity-50 hover:opacity-100")}
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
