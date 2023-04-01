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
import { GptRole } from "#/app/chat/lib/types";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";
import { getMediaUrl } from "#/lib/helpers/url-helpers";
import ParsedMarkdown2 from "#/ui/molecules/ParsedMarkdown/ParsedMarkdown";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChatMessageEdit } from "#/ui/modules/Chat/ChatMessageEdit/ChatMessageEdit";
import { createChatMessage } from "#/app/chat/lib/helpers/chat-helpers";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import { ArrowPathRoundedSquareIcon, PencilIcon, StopIcon } from "@heroicons/react/24/solid";

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
  /**
   * The index of this messages in the context of the conversation
   * Used to edit the message
   */
  messageIndex?: number;
  className?: string;
  onRegenerate?: () => void;
  onStop?: () => void;
};

export const ChatMessage = (props: ChatMessageProps) => {
  const { features } = useFeatureToggleContext();
  const {
    dataState: { bot },
  } = useConversationsContext();
  const speechContext = useSpeechSynthesis();
  const { speaking, cancel } = speechContext;
  const { t } = useTranslation("chat");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  if (!props.content) {
    return null;
  }

  const avatarUrl = !!bot?.avatar?.data ? getMediaUrl(bot.avatar.data.attributes.url) : undefined;

  const { content, role, tokens, isTalking, time, className, messageIndex, onRegenerate, onStop } =
    props;

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

  const regenerateButton = onRegenerate && !isUser && !isSystem && (
    <BaseButton
      flavor="icon"
      icon={<ArrowPathRoundedSquareIcon />}
      onClick={onRegenerate}
      title="Regenerate response"
    />
  );

  const stopButton = onStop && (
    <BaseButton
      flavor="icon"
      icon={<StopIcon />}
      onClick={onStop}
      title="Regenerate response"
      className="absolute left-0 right-0"
    />
  );

  return (
    <li
      className={rootStyles}
      dir="ltr"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
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
            <small className="text-xs text-orange-500">
              {tokens} {t("Tokens")}
            </small>
          </>
        )}
      </div>
      <div className={bubbleStyles}>
        {isEditing && messageIndex ? (
          <ChatMessageEdit
            message={createChatMessage("user", content)}
            messageIndex={messageIndex}
            setEditModeOff={() => setIsEditing(false)}
          />
        ) : (
          <>
            <ParsedMarkdown2 content={content} className={bubbleContentStyles} />
            <Duo gap="full" centered className={isHovering ? "opacity-1" : "opacity-0"}>
              {!isUser ? (
                <ChatSpeakButton text={content} {...speechContext} className="-ml-1" />
              ) : (
                <BaseButton
                  className="mr-auto"
                  flavor="icon"
                  icon={<PencilIcon />}
                  onClick={() => setIsEditing(true)}
                  theme="secondary"
                />
              )}
              <CopyButton content={content} className={buttonStyles} />
            </Duo>
            {regenerateButton}
            {stopButton}
          </>
        )}
      </div>
    </li>
  );
};
export default ChatMessage;
