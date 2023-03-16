"use client";
import { createChatBotMessage } from "#/app/chat/lib/helpers/chat-helpers";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { ChatMessage } from "#/ui/modules/Chat/ChatMessage/ChatMessage";
import cn from "classnames";
import styles from "./ChatMessages.module.scss";

type ChatMessagesProps = {
  botAvatarUrl?: string;
  className?: string;
};

export const ChatMessages = (props: ChatMessagesProps) => {
  const { botAvatarUrl, className } = props;
  const { features } = useFeatureToggleContext();
  const { chatLog, streamedAnswer, loading } = useChatContext();
  const shouldParseMarkdown = !!chatLog && chatLog?.length > 2;

  const messagesChild = chatLog
    ? chatLog.map(
        (message, index) =>
          (features.debugMode || message?.role !== "system") && (
            <ChatMessage
              key={index}
              message={message}
              avatarUrl={botAvatarUrl}
              parseMarkdown={shouldParseMarkdown}
            />
          ),
      )
    : "No chatbot found";

  return (
    <div className={cn(styles.root, className)}>
      {messagesChild}
      <ChatMessage
        key="lastMessage"
        message={streamedAnswer ? createChatBotMessage(streamedAnswer) : null}
        avatarUrl={botAvatarUrl}
        parseMarkdown={shouldParseMarkdown}
        className={!streamedAnswer ? "hidden" : ""}
      />
    </div>
  );
};
export default ChatMessages;
