"use client"

import { useChatContext } from "#/lib/contexts/ChatContext";
import BaseButton, { BaseButtonProps } from "#/ui/_base/BaseButton/BaseButton";
import clsx from "clsx";

export const NewChatButton = ({ className, ...buttonProps }: BaseButtonProps) => {
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
      { ...buttonProps }
    />
  );
};

export default NewChatButton;
