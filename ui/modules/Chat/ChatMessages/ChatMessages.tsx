"use client";

import { createChatMessage } from "#/app/chat/lib/helpers/chat-helpers";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import ChatMessage from "#/ui/modules/Chat/ChatMessage/ChatMessage";
import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./ChatMessages.module.scss";
import { throttle } from "#/lib/helpers/functions/throttle";
import { collateBotTraining } from "#/app/chat/lib/helpers/bot-helpers";

type ChatMessagesProps = {
  /**
   * The very first timestamp should come from the server to avoid hydration errors
   * Further timestamps are generated on the client
   */
  startTime?: string;
  className?: string;
};

export const ChatMessages: FC<ChatMessagesProps> = (props) => {
  const { startTime } = props;
  const { features } = useFeatureToggleContext();
  const {
    appState,
    appActions,
    dataState: { bot },
    dataActions,
  } = useChatContext();
  const { answerStream, selectedConversation, loading, textareaRef } = appState;
  const { submitQuery } = appActions;
  const { updateConversation } = dataActions;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLUListElement>(null);

  const { setCurrentMessage } = appActions;
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const scrollDown = () => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true);
    }
  };
  const throttledScrollDown = throttle(scrollDown, 250);

  useEffect(() => {
    throttledScrollDown();
    selectedConversation &&
      setCurrentMessage(selectedConversation.messages[selectedConversation.messages.length - 2]);
  }, [selectedConversation, setCurrentMessage, throttledScrollDown]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAutoScrollEnabled(entry.isIntersecting);
        if (entry.isIntersecting) {
          textareaRef.current?.focus();
        }
      },
      {
        root: null,
        threshold: 0.5,
      },
    );
    const messagesEndElement = messagesEndRef.current;
    if (messagesEndElement) {
      observer.observe(messagesEndElement);
    }
    return () => {
      if (messagesEndElement) {
        observer.unobserve(messagesEndElement);
      }
    };
  }, [messagesEndRef, textareaRef]);

  if (!selectedConversation) {
    return <div>Loading</div>;
  }

  const incomingAnswerMessage = answerStream
    ? createChatMessage("assistant", answerStream)
    : undefined;

  const trainingContent = collateBotTraining(bot);

  return !selectedConversation || !bot ? (
    <div>Loading</div>
  ) : (
    <ul
      className={clsx(styles.root, "h-full max-h-full overflow-x-hidden bg-base-100")}
      ref={chatContainerRef}
    >
      {features.debugMode && (
        <ChatMessage
          key="bot-training-message"
          content={trainingContent}
          timestamp={0}
          role="system"
        />
      )}
      {selectedConversation.messages.map(
        (message, index) =>
          message.role !== "system" && (
            <ChatMessage
              key={index}
              time={index <= 1 ? startTime : undefined}
              messageIndex={index}
              {...message}
              onRegenerate={
                index !== selectedConversation.messages.length - 1 ||
                selectedConversation.messages.length < 3
                  ? undefined
                  : () => {
                      const messages = selectedConversation.messages.slice(-1);
                      updateConversation({ ...selectedConversation, messages });
                      submitQuery(selectedConversation.messages[index - 1], messages);
                    }
              }
            />
          ),
      )}

      {incomingAnswerMessage && (
        <ChatMessage
          key={selectedConversation.messages.length + 1}
          className={!answerStream && !loading ? "hidden" : ""}
          isTalking={loading || !!answerStream}
          {...incomingAnswerMessage}
          onStop={appActions.cancelStream}
        />
      )}

      <div className="h-[162px]" ref={messagesEndRef} />
    </ul>
  );
};

export default ChatMessages;
