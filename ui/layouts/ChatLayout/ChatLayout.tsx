"use client";
import cn from "classnames";
import React from "react";
import styles from "./ChatLayout.module.scss";
import { useFullScreenContext } from "#/lib/contexts/FullScreenContext";

type ChatLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

const ChatLayout = ({ children, sidebar }: ChatLayoutProps) => {
  const { isFullScreen } = useFullScreenContext();
  return (
    <section
      className={cn(
        styles.ChatLayout,
        "flex h-full max-h-full flex-col overflow-hidden rounded border-2 border-blue-100 bg-blue-100 drop-shadow-lg dark:bg-blue-900 lg:mb-16 lg:flex-row",
        isFullScreen ? "absolute left-0 top-0 h-full w-full" : "",
      )}
    >
      <div className="relative order-last flex h-full flex-col p-1 md:order-first md:p-4 lg:w-9/12">
        {children}
      </div>
      <aside className="flex flex-col justify-start p-2 pr-1 md:justify-end lg:w-3/12 lg:p-0 lg:pl-1 lg:pr-5 lg:pt-2">
        {sidebar}
      </aside>
    </section>
  );
};

export default ChatLayout;
