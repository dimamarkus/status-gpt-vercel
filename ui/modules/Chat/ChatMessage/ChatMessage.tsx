"use client";

import { useSpeechSynthesis } from "react-speech-kit";
import { StatusChatMessage } from "#/lib/types";
import CopyButton from "#/ui/atoms/buttons/CopyButton/CopyButton";
import Timestamp from "#/ui/atoms/decorations/Timestamp/Timestamp";
import ChatMessageAvatar from "#/ui/modules/Chat/ChatMessageAvatar/ChatMessageAvatar";
import ParsedMarkdown from "#/ui/molecules/ParsedMarkdown/ParsedMarkdown";
import clsx from "clsx";
import styles from "./ChatMessage.module.scss";
import ChatSpeakButton from "#/ui/ChatSpeakButton/ChatSpeakButton";
import Duo from "#/ui/_base/Duo/Duo";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";

type ChatMessageProps = {
  avatarUrl?: string;
  message: StatusChatMessage | null;
  /**
   * Display a loading indicator in the chat message.
   */
  isTalking?: boolean;
  /**
   * The server time passed to the first message in the chat log.
   */
  time?: string;
  className?: string;
};

export const ChatMessage = (props: ChatMessageProps) => {
  const { features } = useFeatureToggleContext();

  if (!props.message) {
    return null;
  }

  const { avatarUrl, message, isTalking, time, className } = props;
  const { role, content, tokens } = message;

  const isUser = role === "user";
  const isSystem = role === "system";

  const rootStyles = clsx(
    styles.root,
    "chat m-0 p-4",
    isUser ? [styles.alignRight, "chat-end"] : "chat-start",
    className,
  );

  const bubbleStyles = clsx(
    styles.chatBubble,
    `chat-bubble flex max-w-full flex-col transition`,
    isUser ? "bg-blue-50 dark:bg-slate-900" : "bg-neutral-50 dark:bg-base-300",
  );

  const bubbleContentStyles = clsx(isSystem && "text-orange-500 text-xs max-w-full");

  const buttonStyles = clsx(
    "underline-none py-1 text-xs capitalize text-neutral-300 no-underline transition hover:text-blue-500 dark:text-blue-500/25",
    isUser ? "text-left" : "text-right",
  );

  return (
    <article className={rootStyles} dir="ltr">
      <ChatMessageAvatar
        avatarUrl={avatarUrl}
        isTalking={isTalking}
        role={role}
        className="hidden md:block"
      />
      <div className="flex space-x-1">
        <Timestamp time={time} className="ml-3.5 mb-1" />
        <small className="text-xs text-neutral-400">|</small>
        {features.showTokens && (
          <small className="text-xs text-orange-500 opacity-50">{tokens} Tokens</small>
        )}
      </div>
      <div className={bubbleStyles}>
        <ParsedMarkdown content={content} className={bubbleContentStyles} />
        <Duo gap="full">
          <CopyButton type="link" text="Copy" content={content} className={buttonStyles} />
          <ChatSpeakButton text={content} />
        </Duo>
      </div>
    </article>
  );
};
export default ChatMessage;
