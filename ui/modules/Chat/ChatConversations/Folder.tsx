import { ConversationsFolder } from "#/app/chat/lib/types";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { FC, KeyboardEvent, useEffect, useState } from "react";
import { ConversationItem } from "./Conversation";

interface Props {
  searchTerm: string;
  currentFolder: ConversationsFolder;
}

export const Folder: FC<Props> = ({ searchTerm, currentFolder }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const {
    dataActions: { updateConversation, deleteFolder, updateFolder },
  } = useConversationsContext();

  const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRename();
    }
  };

  const handleRename = () => {
    updateFolder({ ...currentFolder, name: renameValue });
    setRenameValue("");
    setIsRenaming(false);
  };

  const handleDrop = (e: any, folder: ConversationsFolder) => {
    if (e.dataTransfer) {
      setIsOpen(true);

      const conversation = JSON.parse(e.dataTransfer.getData("conversation"));
      updateConversation({ ...conversation, folderId: folder.id });

      e.target.style.background = "none";
    }
  };

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  const highlightDrop = (e: any) => {
    e.target.style.background = "#343541";
  };

  const removeHighlight = (e: any) => {
    e.target.style.background = "none";
  };

  useEffect(() => {
    if (isRenaming) {
      setIsDeleting(false);
    } else if (isDeleting) {
      setIsRenaming(false);
    }
  }, [isRenaming, isDeleting]);

  useEffect(() => {
    if (searchTerm) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchTerm]);

  return (
    <li>
      <div
        className={`mb-1 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[12px] leading-normal text-base-content transition-colors duration-200 hover:bg-base-200/90`}
        onClick={() => setIsOpen(!isOpen)}
        onDrop={(e) => handleDrop(e, currentFolder)}
        onDragOver={allowDrop}
        onDragEnter={highlightDrop}
        onDragLeave={removeHighlight}
      >
        {isOpen ? (
          <ChevronDownIcon width={16} height={16} />
        ) : (
          <ChevronRightIcon width={16} height={16} />
        )}

        {isRenaming ? (
          <input
            className="flex-1 overflow-hidden overflow-ellipsis border-b border-neutral-400 bg-transparent pr-1 text-left outline-none focus:border-neutral-100"
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={handleEnterDown}
            autoFocus
          />
        ) : (
          <div className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap pr-1 text-left">
            {currentFolder.name}
          </div>
        )}

        {(isDeleting || isRenaming) && (
          <div className="-ml-2 flex gap-1">
            <CheckIcon
              className="min-w-[20px] text-neutral-400 hover:text-neutral-100"
              width={16}
              height={16}
              onClick={(e) => {
                e.stopPropagation();

                if (isDeleting) {
                  deleteFolder(currentFolder.id);
                } else if (isRenaming) {
                  handleRename();
                }

                setIsDeleting(false);
                setIsRenaming(false);
              }}
            />

            <XMarkIcon
              className="min-w-[20px] text-neutral-400 hover:text-neutral-100"
              width={16}
              height={16}
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleting(false);
                setIsRenaming(false);
              }}
            />
          </div>
        )}

        {!isDeleting && !isRenaming && (
          <div className="ml-2 flex gap-1">
            <PencilIcon
              className="min-w-[20px] text-neutral-400 hover:text-neutral-100"
              width={18}
              height={18}
              onClick={(e) => {
                e.stopPropagation();
                setIsRenaming(true);
                setRenameValue(currentFolder.name);
              }}
            />

            <TrashIcon
              className=" min-w-[20px] text-neutral-400 hover:text-neutral-100"
              width={18}
              height={18}
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleting(true);
              }}
            />
          </div>
        )}
      </div>
      <ul className="ml-5 border-l border-neutral-500/20 pl-2">
        {isOpen
          ? currentFolder.conversations.map((conversation, index) => {
              if (conversation.folderId === currentFolder.id) {
                return <ConversationItem key={index} conversation={conversation} />;
              }
            })
          : null}
      </ul>
    </li>
  );
};

export default Folder;
