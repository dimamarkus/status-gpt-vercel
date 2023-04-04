"use client";

import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { getBotAvatar } from "#/lib/helpers/url-helpers";
import Duo from "#/ui/_base/Duo/Duo";
import Loader from "#/ui/atoms/Loader/Loader";
import Spinner from "#/ui/atoms/svgs/Spinner";
import ChatMessageAvatar from "#/ui/modules/Chat/ChatMessageAvatar/ChatMessageAvatar";
import ChatBotSelect from "#/ui/modules/ChatSidebar/ChatBotSelect";
import clsx from "clsx";
import { Suspense } from "react";

export const ChatSidebarHeader = () => {
  const {
    appState: { selectedConversation, sidebar },
    appActions: { toggleSidebarSection },
    dataState: { bot },
  } = useConversationsContext();
  const conversation = selectedConversation;

  const isSectionOpen = sidebar.botSettings;

  const rootStyles = "display flex px-4 mb-4 flex-shrink-0";

  const innerHeader =
    !bot || !conversation ? (
      <Duo className={rootStyles}>
        <ChatMessageAvatar loading />
        <Duo gap="none" vertical fullWidth>
          <Loader as="h2" speed="slow" />
          <>
            <Loader as="small" speed="slow" />
            <Loader as="small" speed="slow" />
          </>
        </Duo>
      </Duo>
    ) : (
      <Duo as="header" className={rootStyles} centered>
        <ChatMessageAvatar avatarUrl={getBotAvatar(bot)} role={"assitant"} />
        <Duo vertical gap="none">
          <h2>{bot.name}</h2>
          <small className="font-medium">{bot.description}</small>
        </Duo>
      </Duo>
    );

  return (
    <header className={clsx("collapse flex flex-col")}>
      <label htmlFor="sidebarHeader" className="collapse-title p-0 font-medium">
        {innerHeader}
      </label>
      <input
        id="sidebarHeader"
        type="checkbox"
        checked={isSectionOpen}
        onChange={() => toggleSidebarSection("botSettings")}
        className="absolute h-4"
      />
      <div className="collapse-content flex h-full flex-col overflow-auto p-0">
        <Suspense fallback={<Spinner />}>
          <ChatBotSelect selectedSlug={bot ? bot.slug : null} />
        </Suspense>
      </div>
    </header>
  );
};

export default ChatSidebarHeader;
