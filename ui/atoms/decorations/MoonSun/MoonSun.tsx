import React from "react";
import styles from "./MoonSun.module.scss";
import clsx from "clsx";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";

type MoonSunProps = {
  darkMode?: boolean;
  onClick?: () => void;
  className?: string;
};

export const MoonSun = (props: MoonSunProps) => {
  const { darkMode, onClick, className } = props;

  return (
    <button title="Toggle dark mode" onClick={onClick} className={className}>
      <div className={clsx(styles.moonSun, !darkMode && styles.light)} />
    </button>
  );
};

export default MoonSun;
