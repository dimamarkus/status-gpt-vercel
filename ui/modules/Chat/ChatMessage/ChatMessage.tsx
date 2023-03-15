"use client";
import cn from "classnames";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import CopyButton from "#/ui/atoms/buttons/CopyButton/CopyButton";
import ChatMessageAvatar from "#/ui/modules/Chat/ChatMessageAvatar/ChatMessageAvatar";
import ParsedMarkdown from "#/ui/molecules/ParsedMarkdown/ParsedMarkdown";
import { StatusChatMessage } from "#/lib/types";
import { ReviewsSkeleton } from "#/app/examples/streaming/_components/reviews";

type ChatMessageProps = {
  avatarUrl?: string;
  message: StatusChatMessage;
  isTalking?: boolean;
};

export const ChatMessage = ({ avatarUrl, message, isTalking }: ChatMessageProps) => {
  const { role, content } = message;
  const currentDateTime = new Date();
  const time = currentDateTime.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" });
  const isUserMessage = role === "user";
  const chatClass = isUserMessage ? "chat-end" : "chat-start";
  const chatBg = isUserMessage ? "bg-blue-50" : "bg-neutral-50";

  // const {
  //   features: { debugMode },
  // } = useFeatureToggleContext();

  // const shouldHideMessage = !debugMode && message?.role === "system";
  // if (shouldHideMessage) {
  //   return null;
  // }

  const Timestamp = dynamic(() => import("./Timestamp"), { ssr: false });
  return (
    <div dir="ltr" className={"chat m-0 p-4" + " " + chatClass}>
      <ChatMessageAvatar
        avatarUrl={avatarUrl}
        isUserMessage={isUserMessage}
        isTalking={isTalking}
      />
      <Timestamp time={time} />
      <div
        className={`chat-bubble text-neutral-900 ${chatBg} flex max-w-full flex-col transition hover:bg-gray-100`}
      >
        <Suspense fallback={<ReviewsSkeleton />}>
          <ParsedMarkdown content={content} className="text-sm md:text-base" />
        </Suspense>
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
