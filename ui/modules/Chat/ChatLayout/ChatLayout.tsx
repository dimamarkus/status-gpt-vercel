"use client";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useLayoutContext } from "#/lib/contexts/LayoutContext";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import { useOutsideClick } from "#/lib/hooks/useOutsideClick";
import Overlay from "#/ui/atoms/Overlay/Overlay";
import clsx from "clsx";
import React from "react";
import styles from "./ChatLayout.module.scss";

type ChatLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const ChatLayout = ({ children, sidebar }: ChatLayoutProps) => {
  const { features } = useFeatureToggleContext();
  const { isFullScreen, sidebarIsVisible, toggleSidebar } = useLayoutContext();
  const isMobile = useIsMobile();
  const ref = useOutsideClick<HTMLDivElement>(() => isMobile && toggleSidebar());

  const rootStyles = clsx(
    "statusChat flex h-full max-h-full overflow-hidden md:rounded drop-shadow-lg lg:flex-row dark:border-none",
    "bg-blue-100 dark:bg-base-300",
    isFullScreen && "absolute left-0 top-0 w-full h-full",
  );

  const asideStyles = clsx(
    "flex flex-col flex-grow-0 flex-shrink-0 z-1 justify-start md:justify-end md:py-4 pt-10",
    "md:relative absolute h-full",
    "text-blue-900 dark:text-blue-200/100 bg-blue-100",
    sidebarIsVisible ? "w-[280px] md:w-4/12 lg:w-3/12" : "",
    features.sidebarRight ? "right-0" : "left-0",
  );

  const mainContentStyles = clsx("relative flex h-full flex-col w-full");

  return (
    <div className={clsx(styles.root, rootStyles, isFullScreen && styles.fullScreen)}>
      {sidebarIsVisible && !features.sidebarRight && (
        <aside className={asideStyles} ref={ref}>
          {sidebar}
        </aside>
      )}
      {sidebarIsVisible && isMobile && <Overlay />}
      <section className={mainContentStyles}>{children}</section>
      {sidebarIsVisible && features.sidebarRight && (
        <aside className={asideStyles} ref={ref}>
          {sidebar}
        </aside>
      )}
    </div>
  );
};

export default ChatLayout;
