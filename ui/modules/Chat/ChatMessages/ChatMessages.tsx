"use client";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ChatMessages.module.scss";
import { createChatBotMessage } from "#/app/chat/lib/helpers/chat-helpers";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import ResizablePanel from "#/ui/containers/ResizablePanel/ResizablePanel";
import { ChatMessage } from "#/ui/modules/Chat/ChatMessage/ChatMessage";
import FullScreenToggleButton from "#/ui/molecules/actionButtons/FullScreenToggleButton/FullScreenToggleButton";

type ChatMessagesProps = {
  botAvatarUrl?: string;
  className?: string;
};

export const ChatMessages = (props: ChatMessagesProps) => {
  const { botAvatarUrl, className } = props;
  const animated = true;
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

  const innerChild = (
    <>
      {messagesChild}
      {!!streamedAnswer && (
        <ChatMessage
          avatarUrl={botAvatarUrl}
          key="streamedAnswer"
          message={createChatBotMessage(streamedAnswer)}
          parseMarkdown
          isTalking={loading}
        />
      )}
    </>
  );

  return (
    <div className={cn(styles.ChatMessages, className)}>
      {animated ? (
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className={cn(styles.chatLog, "my-4 h-full")}>{innerChild}</motion.div>
          </AnimatePresence>
        </ResizablePanel>
      ) : (
        <div className={cn(styles.chatLog, "h-full")}>{innerChild}</div>
      )}
    </div>
  );
};
export default ChatMessages;
