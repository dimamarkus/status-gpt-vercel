"use client";

import {filterConversationsData} from "#/app/chat/lib/helpers/chat-helpers";
import {ConversationsDataState} from "#/app/chat/lib/reducer";
import {useConversationsContext} from "#/lib/contexts/ConversationContext";
import ChatStats from "#/ui/modules/Chat/ChatStats/ChatStats";
import ChatSuggestions from "#/ui/modules/Chat/ChatSuggestions/ChatSuggestions";
import {ConversationsHeader} from "#/ui/modules/ChatSidebar/ConversationsHeader";
import {EyeSlashIcon} from "@heroicons/react/24/outline";
import {useTranslation} from "next-i18next";
import {FC, useEffect, useState} from "react";
import {Conversations} from "./Conversations";
import {Folders} from "./Folders";
import {Search} from "./Search";
import {SidebarSettings} from "./SidebarSettings";

export const ChatSidebar: FC<{}> = () => {
  const {
    dataState: { folders, rootConversations },
    dataActions: { resetFolders, exportConversations, setConversations },
  } = useConversationsContext();

  const { t } = useTranslation("sidebar");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ConversationsDataState>({
    folders,
    rootConversations,
  });

  useEffect(() => {
    if (searchTerm) {
      const filteredData = filterConversationsData({ folders, rootConversations }, searchTerm);
      setFilteredData(filteredData);
    } else {
      setFilteredData({ folders, rootConversations });
    }
  }, [searchTerm, folders, rootConversations]);

  const hasConversations = rootConversations.length > 1 || folders.length > 0;

  return (
    <>
      <ConversationsHeader onAddConversation={() => setSearchTerm("")} />
      {hasConversations && <Search searchTerm={searchTerm} onSearch={setSearchTerm} />}

      <div className="flex-grow overflow-y-auto overflow-x-clip">
        {folders.length > 0 && <Folders searchTerm={searchTerm} folders={filteredData.folders} />}

        {rootConversations.length > 0 && (
          <Conversations conversations={filteredData.rootConversations} />
        )}

        {!rootConversations.length && !folders.length && (
          <div className="mt-8 select-none text-center opacity-50">
            <EyeSlashIcon className="mx-auto mb-3" width={18} height={18} />
            <span className="text-[12.5px] leading-3">{t("No conversations.")}</span>
          </div>
        )}
      </div>

      <SidebarSettings
        conversationsCount={rootConversations.length || folders.length}
        onClearConversations={resetFolders}
        onExportConversations={exportConversations}
      />
      <ChatStats />
      <ChatSuggestions className="hidden md:block" />
    </>
  );
};

export default ChatSidebar;
