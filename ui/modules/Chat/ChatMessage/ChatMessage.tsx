"use client";
import cn from "classnames";
import styles from "./ChatMessage.module.scss";
import { StatusChatMessage } from "#/lib/types";
import CopyButton from "#/ui/atoms/buttons/CopyButton/CopyButton";
import Timestamp from "#/ui/modules/Chat/ChatMessage/Timestamp";
import ChatMessageAvatar from "#/ui/modules/Chat/ChatMessageAvatar/ChatMessageAvatar";
import ParsedMarkdown from "#/ui/molecules/ParsedMarkdown/ParsedMarkdown";

type ChatMessageProps = {
  avatarUrl?: string;
  message: StatusChatMessage | null;
  isTalking?: boolean;
  className?: string;
};

export const ChatMessage = (props: ChatMessageProps) => {
  const { avatarUrl, message, isTalking, className } = props;
  if (!message) {
    return null;
  }
  const { role, content } = message;
  const currentDateTime = new Date();
  const time = currentDateTime.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" });

  const isSystemMessage = role === "system";
  const isUserMessage = role === "user";
  const chatClass = isUserMessage ? [styles.alignRight, "chat-end"] : "chat-start";
  const chatBg = isUserMessage ? "bg-blue-50 dark:bg-blue-900" : "bg-neutral-50 dark:bg-base-200";

  return (
    <div className={cn(styles.root, "chat m-0 p-4", chatClass, className)} dir="ltr">
      <ChatMessageAvatar
        avatarUrl={avatarUrl}
        isUserMessage={isUserMessage}
        isTalking={isTalking}
        className={role === "system" ? "hidden" : ""}
      />
      {!isSystemMessage && <Timestamp time={time} />}
      <div
        className={cn(
          styles.chatBubble,
          `chat-bubble text-neutral-900 ${chatBg} flex max-w-full flex-col transition`,
          isSystemMessage ? "bg-orange-100" : "",
        )}
      >
        <ParsedMarkdown content={content} className="text-sm md:text-base" />
        <CopyButton
          type="link"
          text="Copy"
          content={content}
          className={cn(
            "underline-none py-1 text-xs capitalize text-neutral-300 no-underline transition hover:text-blue-500",
            isUserMessage ? "text-left" : "text-right",
          )}
        />
      </div>
    </div>
  );
};
export default ChatMessage;
