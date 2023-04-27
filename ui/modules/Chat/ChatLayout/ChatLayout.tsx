"use client";
import { useLayoutContext } from "#/lib/contexts/LayoutContext";
import { useSettingsContext } from "#/lib/contexts/SettingsContext";
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
  const { settings } = useSettingsContext();
  const { isFullScreen, sidebarIsVisible, toggleSidebar } = useLayoutContext();
  const isMobile = useIsMobile();
  const ref = useOutsideClick<HTMLDivElement>(() => isMobile && sidebarIsVisible && toggleSidebar());

  const rootStyles = clsx(
    "statusChat flex h-full max-h-full overflow-hidden md:rounded drop-shadow-lg lg:flex-row dark:border-none",
    isFullScreen && "absolute left-0 top-0 w-full h-full",
  );

  const asideStyles = clsx(
    "flex flex-col flex-grow-0 flex-shrink-0 z-2 justify-start md:justify-end pt-4",
    "h-full",
    "text-blue-900 dark:text-blue-200/100 border-l border-blue-200/50 dark:border-none",
    settings.sidebarRight ? "right-0 order-last" : "left-0",
    "transform", // Add transform property
    "transition-transform duration-300", // Add transition
    "transition",
    "absolute md:relative",
    "w-[280px] md:w-[30%]",
    "z-10",
    "md:translate-x-none",
    sidebarIsVisible
      ? "translate-x-0"
      : settings.sidebarRight
      ? "translate-x-full"
      : "-translate-x-full",
  );

  const mainContentStyles = clsx(
    "relative flex h-full flex-col w-full",
    sidebarIsVisible && "z-[-1]",
  );

  const shouldRenderAside = isMobile || (!isMobile && sidebarIsVisible);
  const aside = shouldRenderAside && (
    <aside className={asideStyles} ref={ref}>
      {sidebar}
    </aside>
  );

  return (
    <div className={clsx(styles.root, rootStyles, isFullScreen && styles.fullScreen)}>
      {!settings.sidebarRight && aside}
      {isMobile && <Overlay className={sidebarIsVisible ? "opacity-100" : "opacity-0"} />}
      <section className={mainContentStyles}>{children}</section>
      {settings.sidebarRight && aside}
    </div>
  );
};

export default ChatLayout;
