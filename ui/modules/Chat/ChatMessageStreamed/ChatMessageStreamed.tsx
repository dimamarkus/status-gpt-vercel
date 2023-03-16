"use client";
import dynamic from "next/dynamic";
import styles from "./ChatMessageStreamed.module.scss";
import CopyButton from "#/ui/atoms/buttons/CopyButton/CopyButton";
import ChatMessageAvatar from "#/ui/modules/Chat/ChatMessageAvatar/ChatMessageAvatar";
import ParsedMarkdown from "#/ui/molecules/ParsedMarkdown/ParsedMarkdown";

type ChatMessageStreamedProps = {
  avatarUrl?: string;
  content?: string;
  isTalking?: boolean;
  parseMarkdown?: boolean;
};

export const ChatMessageStreamed = ({
  avatarUrl,
  content,
  isTalking,
  parseMarkdown,
}: ChatMessageStreamedProps) => {
  const currentDateTime = new Date();
  const time = currentDateTime.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" });
  const Timestamp = dynamic(() => import("./Timestamp"), { ssr: true });

  return (
    <div className={styles.root} dir="ltr">
      {/* <ChatMessageStreamedAvatar
        avatarUrl={avatarUrl}
        isUserMessage={isUserMessage}
        isTalking={isTalking}
        className={role === "system" ? "hidden" : ""}
      /> */}
      <Timestamp time={time} />
      <div className="chat-bubble flex max-w-full flex-col bg-neutral-50 text-neutral-900 transition">
        {parseMarkdown ? (
          <ParsedMarkdown content={content} className="text-sm md:text-base" />
        ) : (
          <div>{content}</div>
        )}
        <CopyButton
          type="link"
          text="Copy"
          content={content || ""}
          className="underline-none py-1 text-right text-xs capitalize text-neutral-300 no-underline transition hover:text-blue-500"
        />
      </div>
    </div>
  );
};
export default ChatMessageStreamed;
