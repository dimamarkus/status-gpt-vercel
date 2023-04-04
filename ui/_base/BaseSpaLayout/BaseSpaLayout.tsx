"use client";
import { interFont, tiemposHeadlineFont } from "#/app/fonts";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useLayoutContext } from "#/lib/contexts/LayoutContext";
import BaseLayout from "#/ui/_base/BaseLayout/BaseLayout";
import clsx from "clsx";
import React from "react";

type BaseSpaLayoutProps = {
  children?: React.ReactNode;
  className?: string;
};

export const BaseSpaLayout = ({ children, className = "" }: BaseSpaLayoutProps) => {
  const { features } = useFeatureToggleContext();
  const { isFullScreen, toggleFullScreen } = useLayoutContext();
  const globalFont = "font-" + features.font;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      isFullScreen && toggleFullScreen();
    }
  };

  return (
    <BaseLayout
      className={clsx(globalFont, className, features.darkMode && "dark")}
      theme={features.darkMode ? "dark" : "light"}
      onKeyDown={handleKeyDown}
    >
      <style jsx global>
        {`
          :root {
            --font-inter: ${interFont.style.fontFamily};
            --font-tiemposHeadline: ${tiemposHeadlineFont.style.fontFamily};
          }
        `}
      </style>
      {children}
    </BaseLayout>
  );
};
export default BaseSpaLayout;
