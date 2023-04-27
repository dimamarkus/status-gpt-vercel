import BaseLayout from "#/ui/_base/BaseLayout/BaseLayout";
import BaseSpaLayout from "#/ui/_base/BaseSpaLayout/BaseSpaLayout";
import TopBar from "#/ui/molecules/TopBar/TopBar";
import clsx from "clsx";
import React from "react";
import styles from "./LandingLayout.module.scss";

type LandingLayoutProps = {
  ssr?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export const LandingLayout = ({ children, ssr, className }: LandingLayoutProps) => {
  const Component = ssr ? BaseLayout : BaseSpaLayout;

  return (
    <Component>
      <div className={clsx(styles.root, className)}>
        <main role="main">
          <TopBar />
          {children}
        </main>
      </div>
    </Component>
  );
};
export default LandingLayout;
