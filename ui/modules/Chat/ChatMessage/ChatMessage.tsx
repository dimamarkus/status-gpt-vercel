"use client";

import { useSpeechSynthesis } from "react-speech-kit";
import { StatusChatMessage } from "#/app/chat/lib/types";
import CopyButton from "#/ui/atoms/buttons/CopyButton/CopyButton";
import Timestamp from "#/ui/atoms/decorations/Timestamp/Timestamp";
import ChatMessageAvatar from "#/ui/modules/Chat/ChatMessageAvatar/ChatMessageAvatar";
import ParsedMarkdown from "#/ui/molecules/ParsedMarkdown/ParsedMarkdown";
import clsx from "clsx";
import styles from "./ChatMessage.module.scss";
import ChatSpeakButton from "#/ui/atoms/buttons/ChatSpeakButton/ChatSpeakButton";
import Duo from "#/ui/_base/Duo/Duo";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { GptRole } from "#/app/chat/lib/openai";

type ChatMessageProps = Omit<StatusChatMessage, "role"> & {
  role?: GptRole;
  avatarUrl?: string;
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
  const speechContext = useSpeechSynthesis();
  const { speaking, cancel } = speechContext;

  if (!props.content) {
    return null;
  }

  const { avatarUrl, content, role, tokens, isTalking, time, className } = props;

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

  const buttonStyles = isUser ? "text-left" : "text-right";

  return (
    <article className={rootStyles} dir="ltr">
      <ChatMessageAvatar
        avatarUrl={avatarUrl}
        isTalking={isTalking || speaking}
        role={role}
        className={clsx("hidden md:block", speaking && "cursor-pointer")}
        onClick={() => {
          speaking && cancel();
        }}
      />
      <div className="chat-header flex space-x-1">
        <Timestamp time={time} className="ml-3.5 mb-1" />
        {features.showTokens && tokens && (
          <>
            <small className="text-xs text-neutral-400">|</small>
            <small className="text-xs text-orange-500">{tokens} Tokens</small>
          </>
        )}
      </div>
      <div className={bubbleStyles}>
        <ParsedMarkdown content={content} className={bubbleContentStyles} />
        <Duo gap="full" centered>
          {!isUser && <ChatSpeakButton text={content} {...speechContext} className="-ml-1" />}
          <CopyButton content={content} className={buttonStyles} />
        </Duo>
      </div>
    </article>
  );
};
export default ChatMessage;
