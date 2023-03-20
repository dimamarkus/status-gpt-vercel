"use client";
import clsx from "clsx";
import { useEffect } from "react";
import styles from "./ChatMessages.module.scss";
import { createChatBotMessage } from "#/app/chat/lib/helpers/chat-helpers";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { ChatMessage } from "#/ui/modules/Chat/ChatMessage/ChatMessage";

type ChatMessagesProps = {
  botAvatarUrl?: string;
  className?: string;
};

export const ChatMessages = (props: ChatMessagesProps) => {
  const { botAvatarUrl, className } = props;
  const { features } = useFeatureToggleContext();
  const { chatLog, streamedAnswer, loading } = useChatContext();

  useEffect(() => {
    // TODO! Doenst work
    // A little hack to keep the scrolling at the bottom during chat
    // https://css-tricks.com/books/greatest-css-tricks/pin-scrolling-to-bottom/
    if (document.scrollingElement) {
      document.scrollingElement.scroll(0, 1);
    }
  }, []);

  const messagesChild = chatLog
    ? chatLog.map(
        (message, index) =>
          (features.debugMode || message?.role !== "system") && (
            <ChatMessage key={index} message={message} avatarUrl={botAvatarUrl} />
          ),
      )
    : "No chatbot found";

  return (
    <div className={clsx(styles.root, className)}>
      {messagesChild}
      <ChatMessage
        key="lastMessage"
        message={streamedAnswer ? createChatBotMessage(streamedAnswer) : null}
        avatarUrl={botAvatarUrl}
        className={!streamedAnswer ? "hidden" : ""}
        isTalking={loading}
      />
      <div className={styles.scrollAnchor} />
    </div>
  );
};
export default ChatMessages;
