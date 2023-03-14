import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ChatMessages.module.scss";
import { AvatarContextProvider, DEFAULT_AVATAR_CONTEXT } from "#/lib/contexts/AvatarContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import Mouth from "#/ui/atoms/decorations/Mouth/Mouth";
import ResizablePanel from "#/ui/containers/ResizablePanel/ResizablePanel";
import { ChatMessage } from "#/ui/modules/Chat/ChatMessage/ChatMessage";
import FullScreenToggleButton from "#/ui/molecules/actionButtons/FullScreenToggleButton/FullScreenToggleButton";
import { StatusChatMessage } from "#/lib/types";

type ChatMessagesProps = {
  messages: StatusChatMessage[];
  currentResponse?: string;
  className?: string;
  responseLoading?: boolean;
};

export const ChatMessages = (props: ChatMessagesProps) => {
  const { messages, currentResponse, responseLoading, className } = props;
  const {
    features: { debugMode },
  } = useFeatureToggleContext();

  const avatarClasses = "align-center chat-image flex h-16 w-16 justify-center text-center";
  const avatarChild = (
    <div className={cn(avatarClasses, "absolute bottom-4 left-4")}>
      <Mouth animated={true} />
    </div>
  );

  return (
    <AvatarContextProvider {...DEFAULT_AVATAR_CONTEXT}>
      <FullScreenToggleButton />
      <div className={cn(styles.ChatMessages, "rounded-b border-t bg-base-100 ", className)}>
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className={cn(styles.chatLog, "my-4 h-full")}>
              {messages.map(
                (message, index) =>
                  (debugMode || message?.role !== "system") && (
                    <ChatMessage key={index} message={message} />
                  ),
              )}
              {!!currentResponse && (
                <ChatMessage
                  key={messages.length}
                  message={{
                    role: "assistant",
                    content: currentResponse,
                    timestamp: Date.now(),
                  }}
                  isTalking={responseLoading}
                />
              )}
              {responseLoading && avatarChild}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </div>
    </AvatarContextProvider>
  );
};
export default ChatMessages;
