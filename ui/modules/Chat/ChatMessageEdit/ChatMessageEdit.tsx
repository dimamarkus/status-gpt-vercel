"use client";

import { StatusChatMessage } from "#/app/chat/lib/types";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { useTranslation } from "next-i18next";
import { FC, memo, useRef, useState } from "react";

interface Props {
  message: StatusChatMessage;
  messageIndex: number;
  setEditModeOff: () => void;
}

export const ChatMessageEdit: FC<Props> = memo((props) => {
  const { message, messageIndex, setEditModeOff } = props;
  const { t } = useTranslation("chat");
  const [messageContent, setMessageContent] = useState(message.content);
  const { dataActions } = useConversationsContext();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageContent(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleEditMessage = () => {
    if (message.content != messageContent) {
      dataActions.editMessage({ ...message, content: messageContent }, messageIndex);
    }
    setEditModeOff();
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEditMessage();
    }
  };

  return (
    <div className="flex w-full flex-col">
      <textarea
        ref={textareaRef}
        className="w-full resize-none whitespace-pre-wrap border-none outline-none dark:bg-[#343541]"
        value={messageContent}
        onChange={handleInputChange}
        onKeyDown={handlePressEnter}
        style={{
          fontFamily: "inherit",
          fontSize: "inherit",
          lineHeight: "inherit",
          padding: "0",
          margin: "0",
          overflow: "hidden",
        }}
      />

      <div className="mt-10 flex justify-center space-x-4">
        <button
          className="h-[40px] rounded-md bg-blue-500 px-4 py-1 text-sm font-medium text-white enabled:hover:bg-blue-600 disabled:opacity-50"
          onClick={handleEditMessage}
          disabled={messageContent.trim().length <= 0}
        >
          {t("Save & Submit")}
        </button>
        <button
          className="h-[40px] rounded-md border border-neutral-300 px-4 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          onClick={() => {
            setMessageContent(message.content);
            setEditModeOff();
          }}
        >
          {t("Cancel")}
        </button>
      </div>
    </div>
  );
});
ChatMessageEdit.displayName = "ChatMessageEdit";

export default ChatMessageEdit;
