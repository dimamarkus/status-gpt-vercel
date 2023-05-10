"use client";

import { useChatContext } from "#/lib/contexts/ChatContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useSettingsContext } from "#/lib/contexts/SettingsContext";
import { inProdEnv } from "#/lib/helpers/env-helpers";
import { getBotAvatar } from "#/lib/helpers/url-helpers";
import { Bot } from "#/lib/types/cms";
import Duo from "#/ui/_base/Duo/Duo";
import ChatAssumptions from "#/ui/modules/Chat/ChatAssumptions/ChatAssumptions";
import ChatBots from "#/ui/modules/Chat/ChatBots/ChatBots";
import ChatConversations from "#/ui/modules/Chat/ChatConversations/ChatConversations";
import ChatMessageAvatar from "#/ui/modules/Chat/ChatMessageAvatar/ChatMessageAvatar";
import ChatSettings from "#/ui/modules/Chat/ChatSettings/ChatSettings";
import ChatSidebarSection from "#/ui/modules/Chat/ChatSidebarSection/ChatSidebarSection";
import ChatStats from "#/ui/modules/Chat/ChatStats/ChatStats";
import ChatSuggestions from "#/ui/modules/Chat/ChatSuggestions/ChatSuggestions";
import Footer from "#/ui/molecules/Footer/Footer";
import { FC } from "react";

type ChatSidebarProps = {
  bots: Bot[];
  selectedBot: Bot;
  botIsTalking?: boolean;
};

export const ChatSidebar: FC<ChatSidebarProps> = (props) => {
  const { bots, selectedBot, botIsTalking } = props;
  const { features } = useFeatureToggleContext();
  const { settings } = useSettingsContext();
  const {
    appState: { sidebar },
  } = useChatContext();
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
        className="self-center w-16 h-16 p-0"
      />
      <Duo vertical gap="none" className="pl-4">
        <h2 className="mb-1 pr-4 sm:text-md text-md dark:text-white">{selectedBot.name}</h2>
        <small className="font-normal text-secondary-content/75 dark:text-primary-content leading-normal">
          {selectedBot.description}
        </small>
      </Duo>
    </>
  );

  return (
    <>
      <ChatSidebarSection
        title={sidebarHeader}
        section="bots"
        shrinkable={ !!sidebar.bots }
        expandable={ botOptions?.length > 0 }
        contentClassName="shadow-inner"
        titleClassName="items-flex-start"
      >
        {/* <ChatBots bots={botOptions} className="rounded-sm bg-white/50 p-0 dark:bg-black/10" /> */}
        <ChatBots bots={botOptions} className="rounded-sm" />
      </ChatSidebarSection>

      <ChatSidebarSection
        title="Conversations"
        section="conversations"
        className="mb-auto"
        fillHeight
        shrinkable={ !!sidebar.conversations }
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

      {settings.enableSuggestions && (
        <ChatSidebarSection title="Suggested Questions" section="suggestions">
          <ChatSuggestions />
        </ChatSidebarSection>
      )}

      <ChatSidebarSection title="Settings" section="settings">
        <ChatSettings />
      </ChatSidebarSection>
      <Footer className="ml-4 mt-2"/>
    </>
  );
};

export default ChatSidebar;
