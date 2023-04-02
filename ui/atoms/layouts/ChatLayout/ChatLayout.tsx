"use client";
import { useLayoutContext } from "#/lib/contexts/LayoutContext";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import { useOutsideClick } from "#/lib/hooks/useOutsideClick";
import Overlay from "#/ui/atoms/Overlay/Overlay";
import ChatHeader from "#/ui/modules/Chat/ChatHeader/ChatHeader";
import ChatInputAlt from "#/ui/modules/Chat/ChatInput/ChatInput";
import ChatSidebar from "#/ui/modules/ChatSidebar/ChatSidebar";
import clsx from "clsx";
import React from "react";
import styles from "./ChatLayout.module.scss";

type ChatLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

const ChatLayout = ({ children, sidebar }: ChatLayoutProps) => {
  const { isFullScreen, sidebarIsVisible, toggleSidebar } = useLayoutContext();
  const isMobile = useIsMobile();
  const ref = useOutsideClick<HTMLDivElement>(() => isMobile && toggleSidebar());

  const rootStyles = clsx(
    "flex h-full max-h-full overflow-hidden md:rounded  drop-shadow-lg lg:flex-row dark:border-none p-4 ",
    "bg-blue-100 dark:bg-base-300",
    isFullScreen && "absolute left-0 top-0 w-full h-full",
  );

  const asideStyles = clsx(
    "flex flex-col z-1 justify-start md:justify-end md:pt-2 pt-10",
    "md:relative absolute right-0 h-full",
    "text-blue-900 dark:text-blue-200/100 bg-blue-100",
    sidebarIsVisible ? "lg:w-3/12" : "",
  );

  const mainContentStyles = "relative order-last flex h-full flex-col md:order-first w-full";

  return (
    <div className={clsx(styles.root, rootStyles, isFullScreen && styles.fullScreen)}>
      <section className={mainContentStyles}>
        <ChatHeader />
        {children}
        <ChatInputAlt />
      </section>
      {sidebarIsVisible && isMobile && <Overlay />}
      {sidebarIsVisible && (
        <aside className={asideStyles} ref={ref}>
          <ChatSidebar />
          {sidebar}
        </aside>
      )}
    </div>
  );
};

export default ChatLayout;
