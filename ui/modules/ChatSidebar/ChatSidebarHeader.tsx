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

  const rootStyles = "display flex px-4 mb-4 flex-shrink-0 flex-col";

  const innerHeader =
    !bot || !conversation ? (
      <Duo gap="none" vertical fullWidth>
        <Loader as="h2" speed="slow" />
        <div>
          <Loader as="small" speed="slow" />
          <Loader as="small" speed="slow" />
        </div>
      </Duo>
    ) : (
      <Duo vertical gap="none">
        <h2 className="mb-1">{bot.name}</h2>
        <small className="font-normal text-slate-600">{bot.description}</small>
      </Duo>
    );

  return (
    <header className={clsx("collapse", rootStyles)}>
      <label
        htmlFor="sidebarHeader"
        className="collapse-title flex items-center space-x-4 p-0 font-medium"
      >
        <ChatMessageAvatar
          loading={!bot}
          avatarUrl={bot ? getBotAvatar(bot) : undefined}
          role={"assistant"}
        />
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
