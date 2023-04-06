import clsx from "clsx";
import React from "react";
import styles from "./DarkModeToggle.module.scss";

type DarkModeToggleProps = {
  darkMode?: boolean;
  onClick?: () => void;
};

export const DarkModeToggle = (props: DarkModeToggleProps) => {
  const { darkMode, onClick } = props;

  return (
    <label className={clsx(styles.root, darkMode && styles.night)} onClick={onClick}>
      <span className={styles.moon}></span>
      <span className={styles.sun}></span>
      <small className={styles.sun__ray}></small>
      <small className={styles.sun__ray}></small>
      <small className={styles.sun__ray}></small>
      <small className={styles.sun__ray}></small>
      <small className={styles.sun__ray}></small>
      <small className={styles.sun__ray}></small>
    </label>
  );
};
export default DarkModeToggle;
