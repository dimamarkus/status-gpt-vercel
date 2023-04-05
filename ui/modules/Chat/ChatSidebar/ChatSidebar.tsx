"use client";

import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { inProdEnv } from "#/lib/helpers/env-helpers";
import { getBotAvatar } from "#/lib/helpers/url-helpers";
import { Bot } from "#/lib/types/cms";
import Duo from "#/ui/_base/Duo/Duo";
import Collapsible from "#/ui/atoms/containers/Collapsible/Collapsible";
import ChatAssumptions from "#/ui/modules/Chat/ChatAssumptions/ChatAssumptions";
import ChatBots from "#/ui/modules/Chat/ChatBots/ChatBots";
import ChatConversations from "#/ui/modules/Chat/ChatConversations/ChatConversations";
import ChatMessageAvatar from "#/ui/modules/Chat/ChatMessageAvatar/ChatMessageAvatar";
import ChatSettings from "#/ui/modules/Chat/ChatSettings/ChatSettings";
import ChatSidebarSection from "#/ui/modules/Chat/ChatSidebarSection/ChatSidebarSection";
import ChatStats from "#/ui/modules/Chat/ChatStats/ChatStats";
import ChatSuggestions from "#/ui/modules/Chat/ChatSuggestions/ChatSuggestions";
import { FC } from "react";

type ChatSidebarProps = {
  bots: Bot[];
  selectedBot: Bot;
  botIsTalking?: boolean;
};

export const ChatSidebar: FC<ChatSidebarProps> = (props) => {
  const { bots, selectedBot, botIsTalking } = props;
  const { features } = useFeatureToggleContext();
  const botOptions = bots.filter(
    (bot) => (inProdEnv ? bot.is_featured : true) && bot.slug !== selectedBot.slug,
  );

  const sidebarHeader = (
    <>
      <ChatMessageAvatar
        loading={!selectedBot}
        avatarUrl={selectedBot ? getBotAvatar(selectedBot) : undefined}
        role={"assistant"}
        isTalking={botIsTalking}
      />
      <Duo vertical gap="none">
        <h2 className="mb-1">{selectedBot.name}</h2>
        <small className="font-normal text-slate-600">{selectedBot.description}</small>
      </Duo>
    </>
  );

  return (
    <>
      <Collapsible
        as="header"
        title={sidebarHeader}
        className="mb-4 px-2"
        titleClassName="flex dark:border-slate-800/75 flex-shrink-0 items-center space-x-4 p-0 mx-2 font-medium"
      >
        <ChatBots bots={botOptions} className="rounded-sm bg-blue-200/50 pb-2 dark:bg-black/10" />
      </Collapsible>

      <ChatSidebarSection
        title="Conversations"
        section="conversations"
        className="mb-auto"
        shrinkable
      >
        <ChatConversations />
      </ChatSidebarSection>

      {features.showTokens && (
        <ChatSidebarSection title="Stats" section="stats">
          <ChatStats />
        </ChatSidebarSection>
      )}

      {features.enableAssumptions && (
        <ChatSidebarSection title="About You" section="assumptions">
          <ChatAssumptions />
        </ChatSidebarSection>
      )}

      {features.enableSuggestions && (
        <ChatSidebarSection title="Questions You Can Try" section="suggestions">
          <ChatSuggestions />
        </ChatSidebarSection>
      )}

      <ChatSidebarSection title="Settings" section="settings">
        <ChatSettings />
      </ChatSidebarSection>
    </>
  );
};

export default ChatSidebar;
