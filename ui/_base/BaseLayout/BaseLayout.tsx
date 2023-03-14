import cn from "classnames";
import React from "react";
import styles from "./BaseLayout.module.scss";
import { DEFAULT_SIDEBAR } from "#/lib/constants/settings";
import { Theme } from "#/lib/contexts/FeatureToggleContext";

type BaseLayoutProps = {
  theme?: Theme;
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export const BaseLayout = ({ children, sidebar, theme, className = "" }: BaseLayoutProps) => {
  return (
    <body
      className={cn(styles.BaseLayout, "drawer drawer-end", className)}
      data-theme={theme || "light"}
    >
      <input className="drawer-toggle" type="checkbox" id={DEFAULT_SIDEBAR} />
      {children}
      <aside className="drawer-side">
        <label className="drawer-overlay" htmlFor={DEFAULT_SIDEBAR}>
          Close
        </label>
        {sidebar}
      </aside>
    </body>
  );
};
export default BaseLayout;
