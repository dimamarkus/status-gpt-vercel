"use client";
import cn from "classnames";
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
    <section
      className={cn(
        styles.root,
        isFullScreen && styles.fullScreen,
        "dark:border-none dark:bg-base-300",
      )}
    >
      <div>
        <FullScreenToggleButton className="absolute top-0 right-0 z-10 md:top-3 md:right-3" />
        {children}
      </div>
      <aside className="md:display-flex hidden">{sidebar}</aside>
    </section>
  );
};

export default ChatLayout;
