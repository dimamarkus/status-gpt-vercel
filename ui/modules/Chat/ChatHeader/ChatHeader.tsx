"use client";

import { DEFAULT_CONVERSATION_NAME } from "#/app/chat/lib/constants";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
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
import { FC } from "react";

export const ChatHeader: FC = () => {
  const { features } = useFeatureToggleContext();
  const { isFullScreen, toggleFullScreen, sidebarIsVisible, toggleSidebar } = useLayoutContext();
  const {
    appState: { selectedConversation },
    dataActions: { resetConversation, addConversation },
  } = useConversationsContext();

  const handleResetConversation = () => {
    if (confirm("Are you sure you want to clear all messages?")) {
      selectedConversation && resetConversation(selectedConversation);
    }
  };

  const rootStyles =
    "flex justify-center border border-b-neutral-300 bg-slate-100 py-1 text-sm text-neutral-500 dark:border-none dark:bg-[#444654] dark:text-neutral-200 z-[1]";

  const fullScreenButton = (
    <BaseButton
      className={features.sidebarRight ? "mr-auto" : "ml-auto"}
      flavor="icon"
      icon={!isFullScreen ? <ArrowsPointingOutIcon /> : <ArrowsPointingInIcon />}
      onClick={() => toggleFullScreen()}
      theme="secondary"
      title={(!isFullScreen ? "Enter" : "Exit") + " Full-screen"}
    />
  );

  const sidebarTogglebutton = (
    <BaseButton
      className={features.sidebarRight ? "ml-auto" : "mr-auto"}
      flavor="icon"
      icon={
        (features.sidebarRight && !sidebarIsVisible) ||
        (!features.sidebarRight && sidebarIsVisible) ? (
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
      {features.sidebarRight ? fullScreenButton : sidebarTogglebutton}
      <BaseButton
        flavor="icon"
        icon={<TrashIcon />}
        onClick={handleResetConversation}
        theme="secondary"
        title="Clear all messages"
      />
      <div className="flex max-w-[240px] items-center overflow-hidden text-ellipsis whitespace-nowrap">
        {selectedConversation ? selectedConversation.name : DEFAULT_CONVERSATION_NAME}
      </div>
      <BaseButton
        flavor="icon"
        icon={<PlusIcon />}
        onClick={addConversation}
        theme="secondary"
        title="Start new conversation"
      />
      {features.sidebarRight ? sidebarTogglebutton : fullScreenButton}
    </header>
  );
};

export default ChatHeader;
