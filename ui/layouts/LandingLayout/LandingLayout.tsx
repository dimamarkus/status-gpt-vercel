import cn from "classnames";
import React from "react";
import styles from "./LandingLayout.module.scss";
import TopBar from "#/ui/molecules/TopBar/TopBar";
import BaseLayout from "#/ui/_base/BaseLayout/BaseLayout";
import BaseSpaLayout from "#/ui/_base/BaseSpaLayout/BaseSpaLayout";

type LandingLayoutProps = {
  ssr?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export const LandingLayout = ({ children, ssr, className }: LandingLayoutProps) => {
  const Component = ssr ? BaseLayout : BaseSpaLayout;
  return (
    <Component>
      <div
        className={cn(styles.LandingLayout, "drawer-content m-auto w-full max-w-6xl", className)}
      >
        <TopBar />
        <main role="main">
          <div className="chat-container flex h-full max-h-full flex-col">{children}</div>
        </main>
      </div>
    </Component>
  );
};
export default LandingLayout;
