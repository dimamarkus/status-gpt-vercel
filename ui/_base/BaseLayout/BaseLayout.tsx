import cn from "classnames";
import React from "react";
import styles from "./BaseLayout.module.scss";
import { DEFAULT_SIDEBAR } from "#/lib/constants/settings";
import { Theme } from "#/lib/contexts/FeatureToggleContext";
import Notifications from "#/ui/atoms/Notifications/Notifications";
import FeaturesPanel from "#/ui/molecules/FeaturesPanel/FeaturesPanel";

type BaseLayoutProps = {
  theme?: Theme;
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
};

export const BaseLayout = ({
  children,
  sidebar,
  theme,
  onKeyDown,
  className = "",
}: BaseLayoutProps) => {
  return (
    <body
      className={cn(styles.BaseLayout, "drawer drawer-end", className)}
      data-theme={theme || "light"}
      onKeyDown={onKeyDown}
    >
      <input className="drawer-toggle" type="checkbox" id={DEFAULT_SIDEBAR} />
      {children}
      <aside className="drawer-side">
        <label className="drawer-overlay" htmlFor={DEFAULT_SIDEBAR}>
          Close
        </label>
        {sidebar}
      </aside>
      <FeaturesPanel />
      <Notifications />
    </body>
  );
};
export default BaseLayout;
