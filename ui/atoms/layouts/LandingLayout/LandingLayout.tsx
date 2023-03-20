import clsx from "clsx";
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
      <div className={clsx(styles.root, "drawer-content", className)}>
        <TopBar />
        <main role="main" className="md:pt-4">
          {children}
        </main>
      </div>
    </Component>
  );
};
export default LandingLayout;
