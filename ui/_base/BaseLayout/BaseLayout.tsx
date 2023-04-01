import { Theme } from "#/lib/contexts/FeatureToggleContext";
import Notifications from "#/ui/atoms/Notifications/Notifications";
import clsx from "clsx";
import React from "react";
import styles from "./BaseLayout.module.scss";

type BaseLayoutProps = {
  theme?: Theme;
  children?: React.ReactNode;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
};

export const BaseLayout = ({ children, theme, onKeyDown, className = "" }: BaseLayoutProps) => {
  return (
    <body
      className={clsx(styles.root, className)}
      data-theme={theme || "light"}
      onKeyDown={onKeyDown}
    >
      {children}
      <Notifications />
    </body>
  );
};
export default BaseLayout;
