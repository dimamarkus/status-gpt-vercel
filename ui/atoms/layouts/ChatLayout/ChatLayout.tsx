"use client";
import { useLayoutContext } from "#/lib/contexts/LayoutContext";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import Duo from "#/ui/_base/Duo/Duo";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import styles from "./ChatLayout.module.scss";

type ChatLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

const ChatLayout = ({ children, sidebar }: ChatLayoutProps) => {
  const { isFullScreen, toggleFullScreen, hasSidebar, toggleSidebar } = useLayoutContext();

  const rootStyles = clsx(
    "flex h-full max-h-full flex-col overflow-hidden md:rounded bg-blue-100 drop-shadow-lg lg:flex-row dark:border-none dark:bg-base-300",
    isFullScreen && "absolute left-0 top-0 w-full h-full",
  );

  const asideStyles = clsx(
    "flex flex-col justify-start p-2 pr-1 md:justify-end md:p-4 md:pl-2 hidden md:flex",
    hasSidebar ? "lg:w-3/12" : "",
  );

  const mainContentStyles = "relative order-last flex h-full flex-col md:order-first md:p-4 w-full";

  const fullscreenToggleStyles = "z-10 md:top-2 md:left-2 p-2";

  const sidebarToggleStyles = clsx(
    "top-5 z-50 h-7 w-7 cursor-pointer sm:top-0.5 sm:h-8 sm:w-8",
    hasSidebar ? "left-[270px] sm:left-[270px]" : "left-4 sm:left-4 ",
  );

  return (
    <div className={clsx(styles.root, rootStyles, isFullScreen && styles.fullScreen)}>
      <div className={mainContentStyles}>
        <Duo gap="full" className="absolute w-full pr-[2rem]">
          <BaseButton
            className={fullscreenToggleStyles}
            flavor="icon"
            icon={!isFullScreen ? <ArrowsPointingOutIcon /> : <ArrowsPointingInIcon />}
            onClick={() => toggleFullScreen()}
            theme="secondary"
            title={(!isFullScreen ? "Enter" : "Exit") + " Full-screen"}
          />
          <BaseButton
            className={sidebarToggleStyles}
            flavor="icon"
            icon={!hasSidebar ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            onClick={toggleSidebar}
            theme="secondary"
          />
        </Duo>
        {children}
      </div>
      {hasSidebar && <aside className={asideStyles}>{sidebar}</aside>}
    </div>
  );
};

export default ChatLayout;
