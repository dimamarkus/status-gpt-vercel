import { Conversation } from "#/app/chat/lib/types";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { FC } from "react";
import { ConversationComponent } from "./Conversation";

interface Props {
  conversations: Conversation[];
}

export const Conversations = ({ conversations }: Props) => {
  const { dataActions } = useConversationsContext();

  const handleDrop = (e: any) => {
    if (e.dataTransfer) {
      const conversation = JSON.parse(e.dataTransfer.getData("conversation"));
      dataActions.updateConversation({ ...conversation, folderId: 0 });

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

  return (
    <ul
      className="my-2 flex-grow gap-2 overflow-y-auto overflow-x-clip"
      onDrop={(e) => handleDrop(e)}
      onDragOver={allowDrop}
      onDragEnter={highlightDrop}
      onDragLeave={removeHighlight}
    >
      {conversations
        .slice()
        .reverse()
        .map((conversation, index) => (
          <ConversationComponent key={index} conversation={conversation} />
        ))}
    </ul>
  );
};
