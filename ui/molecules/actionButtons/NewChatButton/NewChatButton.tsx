"use client"

import { useChatContext } from "#/lib/contexts/ChatContext";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import clsx from "clsx";

export const NewChatButton = ({ className }: { className?: string }) => {
  const { dataActions } = useChatContext();

  return (
    <BaseButton
      theme="secondary"
      flavor="hollow"
      className={clsx(className, "w-fit")}
      onClick={() => dataActions.addConversation() }
      title="Start a new conversationt"
      size="sm"
      text="New Chat"
    />
  );
};

export default NewChatButton;
