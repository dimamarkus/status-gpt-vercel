"use client";
import cn from "classnames";
import React from "react";
import {
  avenirFont,
  exoFont,
  graphikFont,
  interFont,
  latoFont,
  montserratFont,
  ralewayFont,
  tiemposFont,
  tiemposHeadlineFont,
} from "#/app/fonts";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useFullScreenContext } from "#/lib/contexts/FullScreenContext";
import { useSidebarContext } from "#/lib/contexts/SidebarContext";
import BaseLayout from "#/ui/_base/BaseLayout/BaseLayout";

type BaseSpaLayoutProps = {
  children?: React.ReactNode;
  className?: string;
};

export const BaseSpaLayout = ({ children, className = "" }: BaseSpaLayoutProps) => {
  const { sidebar } = useSidebarContext();
  const { features } = useFeatureToggleContext();
  const { isFullScreen, toggleFullScreen } = useFullScreenContext();
  const darkMode = features.theme === "dark";
  const globalFont = "font-" + features.font;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      isFullScreen && toggleFullScreen();
    }
  };

  return (
    <BaseLayout
      className={cn(globalFont, className, darkMode && "dark")}
      data-theme={features.theme}
      onKeyDown={handleKeyDown}
      sidebar={sidebar}
    >
      <style jsx global>
        {`
          :root {
            --font-graphik: ${graphikFont.style.fontFamily};
            --font-tiempos: ${tiemposFont.style.fontFamily};
            --font-tiemposHeadline: ${tiemposHeadlineFont.style.fontFamily};

            --font-avenir: ${avenirFont.style.fontFamily};
            --font-exo: ${exoFont.style.fontFamily};
            --font-inter: ${interFont.style.fontFamily};
            --font-lato: ${latoFont.style.fontFamily};
            --font-raleway: ${ralewayFont.style.fontFamily};
            --font-montserrat: ${montserratFont.style.fontFamily};
          }
        `}
      </style>
      {/* HACK: Empty div to force tailwind to create these font classes */}
      <div className="hidden font-tiempos font-tiemposHeadline font-exo font-avenir font-montserrat font-raleway font-lato font-graphik" />
      {children}
    </BaseLayout>
  );
};
export default BaseSpaLayout;
