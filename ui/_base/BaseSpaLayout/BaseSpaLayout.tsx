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
  const darkMode = features.theme === "dark";
  const globalFont = "font-" + features.font;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      isFullScreen && toggleFullScreen();
    }
  };

  return (
    <BaseLayout
      className={clsx(globalFont, className, darkMode && "dark")}
      theme={features.theme}
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
      {/* HACK: Empty div to force tailwind to create these font classes */}
      <div className="font-tiemposHeadline font-inter hidden" />
      {children}
    </BaseLayout>
  );
};
export default BaseSpaLayout;
