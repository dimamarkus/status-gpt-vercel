"use client";

import { DEFAULT_CONVERSATION_NAME } from "#/app/chat/lib/constants";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useLayoutContext } from "#/lib/contexts/LayoutContext";
import { useSettingsContext } from "#/lib/contexts/SettingsContext";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC } from "react";
import ChatMessageAvatar from "../ChatMessageAvatar/ChatMessageAvatar";
import { getBotAvatar } from "#/lib/helpers/url-helpers";
import { useIsMobile } from "#/lib/hooks/useIsMobile";

export const ChatHeader: FC = () => {
  const { settings } = useSettingsContext();
  const isMobile = useIsMobile();
  const { isFullScreen, toggleFullScreen, sidebarIsVisible, toggleSidebar } = useLayoutContext();
  const {
    appState: { selectedConversation },
    dataActions: { resetConversation, addConversation },
    dataState: { bot }
  } = useChatContext();
  const showAvatarInsteadOfArrow = isMobile && bot && !sidebarIsVisible;

  const handleResetConversation = () => {
    if (confirm("Are you sure you want to clear all messages?")) {
      selectedConversation && resetConversation(selectedConversation);
    }
  };

  const rootStyles =
    "flex justify-center overflow-hidden py-1 sm:px-2 px-3 border-b border-neutral-300 text-sm text-neutral-500 dark:border-none dark:text-neutral-200 z-[1] bg-neutral-200 dark:bg-base-300 shadow-sm";

  const sidebarToggleStyles = clsx(
    settings.sidebarRight
      ? "border-r-2 border-l-0 ml-auto mr-1"
      : "border-l-2 border-r-0 ml-1 mr-auto",
    !showAvatarInsteadOfArrow
        ? "rounded-none border-0 border-secondary hover:border-secondary py-0 my-auto link-secondary opacity-50 hover:opacity-100"
        : "ml-0 p-0",
  );

  const fullScreenButton = (
    <BaseButton
      className={clsx(
        "opacity-50 hover:opacity-100",
        settings.sidebarRight ? "mr-auto" : "ml-auto",
      )}
      flavor="icon"
      icon={!isFullScreen ? <ArrowsPointingOutIcon /> : <ArrowsPointingInIcon />}
      onClick={() => toggleFullScreen()}
      theme="secondary"
      title={(!isFullScreen ? "Enter" : "Exit") + " Full-screen"}
    />
  );

  const sidebarTogglebutton = showAvatarInsteadOfArrow ? (
    <ChatMessageAvatar
      avatarUrl={getBotAvatar(bot, true)}
      className={clsx("p-0 w-[1.5rem] h-[1.5rem] my-auto", settings.sidebarRight ? "ml-auto" : "mr-auto")}
      onClick={toggleSidebar}
      size="sm"
    />
  ) : (
    <BaseButton
      className={sidebarToggleStyles}
      flavor="bare"
      icon={
        (settings.sidebarRight && !sidebarIsVisible) ||
        (!settings.sidebarRight && sidebarIsVisible) ? (
            <ArrowLeftIcon />
          ) : (
            <ArrowRightIcon />
        )
      }
      onClick={toggleSidebar}
      theme="secondary"
    />
  );

  return (
    <header className={rootStyles}>
      {settings.sidebarRight ? fullScreenButton : sidebarTogglebutton}
      <BaseButton
        className="mr-2 opacity-50 hover:opacity-100"
        flavor="icon"
        icon={<TrashIcon />}
        onClick={handleResetConversation}
        theme="secondary"
        title="Clear all messages"
      />
      <h3 className="text-content flex max-w-[240px] items-center overflow-hidden text-ellipsis whitespace-nowrap">
        {selectedConversation ? selectedConversation.name : DEFAULT_CONVERSATION_NAME}
      </h3>
      <BaseButton
        flavor="icon"
        icon={<PlusIcon />}
        onClick={addConversation}
        theme="secondary"
        title="Start new conversation"
        className="ml-2 opacity-50 hover:opacity-100"
      />
      {settings.sidebarRight ? sidebarTogglebutton : fullScreenButton}
    </header>
  );
};

export default ChatHeader;
