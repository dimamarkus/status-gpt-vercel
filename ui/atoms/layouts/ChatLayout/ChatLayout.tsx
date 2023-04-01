"use client";
import { useLayoutContext } from "#/lib/contexts/LayoutContext";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import { useOutsideClick } from "#/lib/hooks/useOutsideClick";
import ChatHeader from "#/ui/modules/Chat/ChatHeader/ChatHeader";
import ChatInputAlt from "#/ui/modules/Chat/ChatInput/ChatInput";
import ChatSidebar from "#/ui/modules/ChatSidebar/ChatSidebar";
import ChatSidebarHeader from "#/ui/modules/ChatSidebar/ChatSidebarHeader";
import clsx from "clsx";
import React from "react";
import styles from "./ChatLayout.module.scss";

type ChatLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

const DEFAULT_SIDEBAR = "chat_sidebar";

const ChatLayout = ({ children, sidebar }: ChatLayoutProps) => {
  const { isFullScreen, hasSidebar, toggleSidebar } = useLayoutContext();
  const isMobile = useIsMobile();
  const ref = useOutsideClick<HTMLDivElement>(() => isMobile && toggleSidebar());

  const rootStyles = clsx(
    "flex h-full max-h-full overflow-hidden md:rounded  drop-shadow-lg lg:flex-row dark:border-none ",
    "bg-blue-100 dark:bg-base-300",
    isFullScreen && "absolute left-0 top-0 w-full h-full",
  );

  const sidebarStyles = clsx(
    "flex flex-col justify-start p-2 pr-1 md:justify-end md:p-4 md:pl-2 md:pt-2 pt-10",
    "md:relative absolute right-0 h-full",
    "text-blue-900 dark:text-blue-200/100 bg-blue-100",
    hasSidebar ? "lg:w-3/12" : "",
  );

  const mainContentStyles = "relative order-last flex h-full flex-col md:order-first md:p-4 w-full";

  return (
    <div className={clsx(styles.root, rootStyles, isFullScreen && styles.fullScreen)}>
      <section className={mainContentStyles}>
        <ChatHeader />
        {children}
        <ChatInputAlt />
      </section>
      {hasSidebar && (
        <aside className={sidebarStyles} ref={ref}>
          <ChatSidebarHeader />
          <ChatSidebar />
          {sidebar}
        </aside>
      )}
    </div>
  );
};

export default ChatLayout;
