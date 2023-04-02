"use client";

import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import ChatModelSelect from "#/ui/modules/Chat/ChatModelSelect/ChatModelSelect";
import Duo from "#/ui/_base/Duo/Duo";
import { Cog8ToothIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import FeaturesPanel from "#/ui/molecules/FeaturesPanel/FeaturesPanel";
import { inProdEnv } from "#/lib/helpers/env-helpers";

export const ChatSidebarHeader: FC = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const { appState, dataActions } = useConversationsContext();
  const conversation = appState.selectedConversation;
  const { t } = useTranslation("model");

  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleResetConversation = () => {
    if (confirm(t<string>("Are you sure you want to clear all messages?"))) {
      conversation && dataActions.resetConversation(conversation);
    }
  };

  return !conversation ? (
    <div>Select a conversation..</div>
  ) : (
    <>
      <Duo gap="full">
        <span>
          {t("Model")}: {conversation.model}
        </span>
        <Cog8ToothIcon
          className="ml-2 cursor-pointer hover:opacity-50"
          onClick={handleSettings}
          width={18}
          height={18}
        />
      </Duo>
      {showSettings && (
        <>
          <ChatModelSelect
            selectedModel={conversation.model}
            onModelChange={(model) => dataActions.updateConversation({ ...conversation, model })}
          />
        </>
      )}
    </>
  );
};

export default ChatSidebarHeader;
