import cn from "classnames";
import { Inter } from "next/font/google";
import React from "react";
import { Toaster } from "react-hot-toast";
import { DEFAULT_SIDEBAR } from "#/lib/constants/settings";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useFullScreenContext } from "#/lib/contexts/FullScreenContext";
import { useSidebarContext } from "#/lib/contexts/SidebarContext";
import FeaturesPanel from "#/ui/molecules/FeaturesPanel/FeaturesPanel";
import {
  graphikFont,
  tiemposFont,
  tiemposHeadlineFont,
  avenirFont,
  exoFont,
  interFont,
  latoFont,
  montserratFont,
  ralewayFont,
} from "#/app/fonts";
type BaseLayoutProps = {
  children?: React.ReactNode;
  className?: string;
};

export const BaseLayout = ({ children, className = "" }: BaseLayoutProps) => {
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
    <body
      className={cn("drawer drawer-end", globalFont, className, darkMode && "dark")}
      data-theme={features.theme}
      onKeyDown={handleKeyDown}
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
      <FeaturesPanel />
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 2000 }} />
      <input id={DEFAULT_SIDEBAR} type="checkbox" className="drawer-toggle" />
      {children}
      <aside className="drawer-side">
        <label htmlFor={DEFAULT_SIDEBAR} className="drawer-overlay">
          Close
        </label>
        {sidebar}
      </aside>
    </body>
  );
};
export default BaseLayout;
