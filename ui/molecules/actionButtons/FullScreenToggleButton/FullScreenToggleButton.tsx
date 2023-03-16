import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import styles from "./FullScreenToggleButton.module.scss";
import { useFullScreenContext } from "#/lib/contexts/FullScreenContext";
import Button from "#/ui/atoms/buttons/Button/Button";

export const FullScreenToggleButton = () => {
  const { isFullScreen, toggleFullScreen } = useFullScreenContext();

  return (
    <button
      className={styles.FullScreenToggleButton}
      onClick={() => toggleFullScreen()}
      title={(!isFullScreen ? "Enter" : "Exit") + " Full-screen"}
    >
      {!isFullScreen ? (
        <ArrowsPointingOutIcon className="h-5 w-5 text-inherit" />
      ) : (
        <ArrowsPointingInIcon className="h-5 w-5 text-inherit" />
      )}
    </button>
  );
};

export default FullScreenToggleButton;
