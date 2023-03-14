import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import styles from "./FullScreenToggleButton.module.scss";
import { useFullScreenContext } from "#/lib/contexts/FullScreenContext";
import Button from "#/ui/atoms/buttons/Button/Button";

export const FullScreenToggleButton = () => {
  const { isFullScreen, toggleFullScreen } = useFullScreenContext();

  return (
    <Button
      className={
        styles.FullScreenToggleButton +
        " " +
        "btn-ghost btn-square btn-sm btn absolute top-3 right-3 z-10 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 md:top-6 md:right-6"
      }
      onClick={() => toggleFullScreen()}
      title={(!isFullScreen ? "Enter" : "Exit") + " Full-screen"}
    >
      {!isFullScreen ? (
        <ArrowsPointingOutIcon className="h-5 w-5 text-inherit" />
      ) : (
        <ArrowsPointingInIcon className="h-5 w-5 text-inherit" />
      )}
    </Button>
  );
};

export default FullScreenToggleButton;
