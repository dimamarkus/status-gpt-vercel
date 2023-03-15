"use client";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ChatMessages.module.scss";
import { createChatBotMessage } from "#/app/chat/lib/helpers/chat-helpers";
import { StatusChatMessage } from "#/lib/types";
import Mouth from "#/ui/atoms/decorations/Mouth/Mouth";
import { ChatMessage } from "#/ui/modules/Chat/ChatMessage/ChatMessage";
import FullScreenToggleButton from "#/ui/molecules/actionButtons/FullScreenToggleButton/FullScreenToggleButton";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useChatContext } from "#/lib/contexts/ChatContext";
import ResizablePanel from "#/ui/containers/ResizablePanel/ResizablePanel";

type ChatMessagesProps = {
  botAvatarUrl?: string;
  className?: string;
};

export const ChatMessages = (props: ChatMessagesProps) => {
  const { botAvatarUrl, className } = props;
  const animated = false;
  const { features } = useFeatureToggleContext();

  const avatarClasses = "align-center chat-image flex h-16 w-16 justify-center text-center";
  const { chatLog, streamedAnswer, loading } = useChatContext();

  const messagesChild = chatLog
    ? chatLog.map(
        (message, index) =>
          (features.debugMode || message?.role !== "system") && (
            <ChatMessage key={index} message={message} avatarUrl={botAvatarUrl} />
          ),
      )
    : "No chatbot found";

  const innerChild = (
    <>
      <FullScreenToggleButton />
      {messagesChild}
      {!!streamedAnswer && (
        <ChatMessage
          avatarUrl={botAvatarUrl}
          key="streamedAnswer"
          message={createChatBotMessage(streamedAnswer)}
          // isTalking={loading}
        />
      )}
      {/* {loading && (
          <div className={cn(avatarClasses, "absolute bottom-4 left-4")}>
            <Mouth animated={true} />
          </div>
        )} */}
    </>
  );

  return (
    <div className={cn(styles.ChatMessages, "rounded-b border-t bg-base-100 ", className)}>
      {animated ? (
        <AnimatedHeight>{innerChild}</AnimatedHeight>
      ) : (
        <div className={cn(styles.chatLog, "my-4 h-full")}>{innerChild}</div>
      )}
    </div>
  );
};
export default ChatMessages;

export const AnimatedHeight = ({ children }: { children: React.ReactNode }) => (
  <ResizablePanel>
    <AnimatePresence mode="wait">
      <motion.div className={cn(styles.chatLog, "my-4 h-full")}>{children}</motion.div>
    </AnimatePresence>
  </ResizablePanel>
);
