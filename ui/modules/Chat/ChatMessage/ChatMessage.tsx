"use client";
import cn from "classnames";
import dynamic from "next/dynamic";
import styles from "./ChatMessage.module.scss";
import { StatusChatMessage } from "#/lib/types";
import CopyButton from "#/ui/atoms/buttons/CopyButton/CopyButton";
import ChatMessageAvatar from "#/ui/modules/Chat/ChatMessageAvatar/ChatMessageAvatar";
import ParsedMarkdown from "#/ui/molecules/ParsedMarkdown/ParsedMarkdown";

type ChatMessageProps = {
  avatarUrl?: string;
  message: StatusChatMessage;
  isTalking?: boolean;
  parseMarkdown?: boolean;
};

export const ChatMessage = ({ avatarUrl, message, isTalking, parseMarkdown }: ChatMessageProps) => {
  const { role, content } = message;
  const currentDateTime = new Date();
  const time = currentDateTime.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" });

  const isSystemMessage = role === "system";
  const isUserMessage = role === "user";
  const chatClass = isUserMessage ? "chat-end" : "chat-start";
  const chatBg = isUserMessage ? "bg-blue-50" : "bg-neutral-50";

  const Timestamp = dynamic(() => import("./Timestamp"), { ssr: true });

  return (
    <div dir="ltr" className={cn(styles.ChatMessage, "chat m-0 p-4", chatClass)}>
      <ChatMessageAvatar
        avatarUrl={avatarUrl}
        isUserMessage={isUserMessage}
        isTalking={isTalking}
        className={role === "system" ? "hidden" : ""}
      />
      { !isSystemMessage && <Timestamp time={time} /> }
      <div
        className={cn(
          `chat-bubble text-neutral-900 ${chatBg} flex max-w-full flex-col transition`,
          isSystemMessage ? "bg-orange-100" : "",
        )}
      >
        {parseMarkdown ? (
          <ParsedMarkdown content={content} className="text-sm md:text-base" />
        ) : (
          <div>{content}</div>
        )}
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
