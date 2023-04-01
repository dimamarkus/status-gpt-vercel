"use client";

import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { useLayoutContext } from "#/lib/contexts/LayoutContext";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { t } from "i18next";
import { FC, useState } from "react";

export const ChatHeader: FC = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const { isFullScreen, toggleFullScreen, hasSidebar, toggleSidebar } = useLayoutContext();
  const { appState, dataActions } = useConversationsContext();
  const conversation = appState.selectedConversation;

  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleResetConversation = () => {
    if (confirm(t<string>("Are you sure you want to clear all messages?"))) {
      conversation && dataActions.resetConversation(conversation);
    }
  };

  const rootStyles =
    "flex justify-center border border-b-neutral-300 bg-slate-100 py-1 text-sm text-neutral-500 dark:border-none dark:bg-[#444654] dark:text-neutral-200 z-[1]";

  return (
    <header className={rootStyles}>
      <BaseButton
        className="mr-auto"
        flavor="icon"
        icon={!isFullScreen ? <ArrowsPointingOutIcon /> : <ArrowsPointingInIcon />}
        onClick={() => toggleFullScreen()}
        theme="secondary"
        title={(!isFullScreen ? "Enter" : "Exit") + " Full-screen"}
      />
      <BaseButton
        flavor="icon"
        icon={<TrashIcon />}
        onClick={handleResetConversation}
        theme="secondary"
        title="Clear all messages"
      />
      <div className="flex max-w-[240px] items-center overflow-hidden text-ellipsis whitespace-nowrap">
        {conversation ? conversation.name : "No conversation selected"}
      </div>
      <BaseButton
        flavor="icon"
        icon={<PlusIcon />}
        onClick={dataActions.addConversation}
        theme="secondary"
        title="Start new conversation"
      />
      <BaseButton
        className="ml-auto"
        flavor="icon"
        icon={!hasSidebar ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        onClick={toggleSidebar}
        theme="secondary"
      />
    </header>
  );
};

export default ChatHeader;
