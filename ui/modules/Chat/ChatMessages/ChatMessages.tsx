"use client";
import clsx from "clsx";
import { useEffect } from "react";
import styles from "./ChatMessages.module.scss";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { ChatMessage } from "#/ui/modules/Chat/ChatMessage/ChatMessage";
import { createChatMessage } from "#/app/chat/lib/helpers/chat-helpers";

type ChatMessagesProps = {
  botAvatarUrl?: string;
  /**
   * The very first timestamp should come from the server to avoid hydration errors
   * Further timestamps are generated on the client
   */
  startTime?: string;
  className?: string;
};

export const ChatMessages = (props: ChatMessagesProps) => {
  const { botAvatarUrl, startTime, className } = props;
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
            <ChatMessage
              key={index}
              avatarUrl={botAvatarUrl}
              time={index <= 1 ? startTime : undefined}
              {...message}
            />
          ),
      )
    : "No chatbot found";

  const loadingAnswerMessage = loading ? createChatMessage("assistant", "...") : undefined;
  const incomingAnswerMessage = streamedAnswer
    ? createChatMessage("assistant", streamedAnswer)
    : undefined;
  const latestMessage = incomingAnswerMessage || loadingAnswerMessage;
  return (
    <section className={clsx(styles.root, className)}>
      {messagesChild}
      {!!latestMessage && (
        <ChatMessage
          key={chatLog ? chatLog.length + 1 : "latestMessage"}
          avatarUrl={botAvatarUrl}
          className={!streamedAnswer && !loading ? "hidden" : ""}
          isTalking={loading}
          {...latestMessage}
        />
      )}
      <div className={styles.scrollAnchor} />
    </section>
  );
};
export default ChatMessages;
