import clsx from "clsx";
import styles from "./ChatMessage.module.scss";
import { StatusChatMessage } from "#/lib/types";
import CopyButton from "#/ui/atoms/buttons/CopyButton/CopyButton";
import Timestamp from "#/ui/modules/Chat/ChatMessage/Timestamp";
import ChatMessageAvatar from "#/ui/modules/Chat/ChatMessageAvatar/ChatMessageAvatar";
import ParsedMarkdown from "#/ui/molecules/ParsedMarkdown/ParsedMarkdown";
import { getCurrentTime } from "#/lib/helpers/datetime-helpers";

type ChatMessageProps = {
  avatarUrl?: string;
  message: StatusChatMessage | null;
  isTalking?: boolean;
  className?: string;
};

export const ChatMessage = (props: ChatMessageProps) => {
  if (!props.message) {
    return null;
  }

  const { avatarUrl, message, isTalking, className } = props;
  const { role, content } = message;

  const isSystem = role === "system";
  const isUser = role === "user";

  //  Chat Message Container
  // ----------------------------------------------------------------------------------------------
  const rootStyles = clsx(
    styles.root,
    "chat m-0 p-4",
    isUser ? [styles.alignRight, "chat-end"] : "chat-start",
    className,
  );

  //  Chat Bubble
  // ----------------------------------------------------------------------------------------------
  const bubbleStyles = clsx(
    styles.chatBubble,
    `chat-bubble flex max-w-full flex-col transition`,
    isUser ? "bg-blue-50 dark:bg-slate-900" : "bg-neutral-50 dark:bg-base-300",
    isSystem && "w-full text-orange-500",
  );

  //  Copy Button
  // ----------------------------------------------------------------------------------------------
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
      {!isSystem && <Timestamp time={getCurrentTime()} />}
      <div className={bubbleStyles}>
        <ParsedMarkdown content={content} className="w-full text-sm md:text-base" />
        <CopyButton type="link" text="Copy" content={content} className={buttonStyles} />
      </div>
    </article>
  );
};
export default ChatMessage;
