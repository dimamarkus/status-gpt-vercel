"use client";
import clsx from "clsx";
import React from "react";
import styles from "./ChatLayout.module.scss";
import { useFullScreenContext } from "#/lib/contexts/FullScreenContext";
import FullScreenToggleButton from "#/ui/molecules/actionButtons/FullScreenToggleButton/FullScreenToggleButton";

type ChatLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

const ChatLayout = ({ children, sidebar }: ChatLayoutProps) => {
  const { isFullScreen } = useFullScreenContext();
  return (
    <div
      className={clsx(
        styles.root,
        isFullScreen && styles.fullScreen,
        "dark:border-none dark:bg-base-300",
      )}
    >
      <div>
        <FullScreenToggleButton className={styles.fullScreenToggle} />
        {children}
      </div>
      <aside className="md:display-flex hidden">{sidebar}</aside>
    </div>
  );
};

export default ChatLayout;
