"use client";
import { filterConversationsData } from "#/app/chat/lib/helpers/chat-helpers";
import { ConversationsDataState } from "#/app/chat/lib/reducer";
import { useChatContext } from "#/lib/contexts/ChatContext";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import { SidebarButton } from "#/ui/atoms/buttons/SidebarButton/SidebarButton";
import Clear from "#/ui/modules/Chat/ChatConversations/Clear";
import { Conversations } from "#/ui/modules/Chat/ChatConversations/Conversations";
import Folders from "#/ui/modules/Chat/ChatConversations/Folders";
import Import from "#/ui/modules/Chat/ChatConversations/Import";
import {
  ArrowDownTrayIcon,
  EyeSlashIcon,
  FolderPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Search } from "./Search";
import Spinner from "#/ui/atoms/svgs/Spinner";

export const ChatConversations = () => {
  const {
    appActions: { selectConversation },
    dataState: { folders, rootConversations },
    dataActions: {
      resetFolders,
      exportConversations,
      addConversation,
      addFolder,
      setConversations,
    },
  } = useChatContext();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ConversationsDataState>({
    folders,
    rootConversations,
  });

  const handleAddConversation = () => {
    setSearchTerm("");
    addConversation();
  };

  const handleImportConversations = (data: ConversationsDataState) => {
    console.log("data", data);
    const rootConversation = data.rootConversations[data.rootConversations.length - 1];
    const nestedConversation = data.folders[0]?.conversations[0];
    setConversations(data);
    selectConversation(rootConversation || nestedConversation);
  };

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
      <header className="flex flex-col gap-4">
        {hasConversations && (
          <Search searchTerm={searchTerm} onSearch={setSearchTerm} />
        )}
        <div className="flex items-center gap-2">
          <button
            className="link-primary flex flex-grow cursor-pointer select-none items-center gap-3 rounded-md border border-primary/20 p-3 text-[12.5px] leading-3 transition-colors duration-200 hover:bg-gray-500/10"
            onClick={handleAddConversation}
          >
            <PlusIcon width={18} height={18} />
            Add Conversation
          </button>

          <BaseButton
            size="md"
            flavor="hollow"
            icon={<FolderPlusIcon />}
            className="ml-2 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md border border-primary/20 p-3 text-[12.5px] leading-3 transition-colors duration-200 hover:bg-blue-500/10"
            onClick={() => addFolder("New folder")}
          />
        </div>
      </header>

      {folders.length > 0 && (
        <div className="flex border-b border-neutral-500/20">
          <Folders searchTerm={searchTerm} folders={folders} />
        </div>
      )}

      {rootConversations.length > 0 && (
        <Conversations conversations={filteredData.rootConversations} />
      )}
      {!rootConversations.length && !folders.length && (
        <div className="my-8 px-4 select-none text-center  items-center justify-center opacity-50">
          <EyeSlashIcon className="mx-auto mb-3" width={18} height={18} />
          <span className="text-[12.5px] leading-3">No conversations. Add one to begin.</span>
        </div>
      )}
    </>
  );
};

export default ChatConversations;
