import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ChatWindow.module.scss";
import { AvatarContextProvider, DEFAULT_AVATAR_CONTEXT } from "#/lib/contexts/AvatarContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { ChatMessage } from "#/types";
import ResizablePanel from "#/ui/containers/ResizablePanel/ResizablePanel";
import ChatBubble from "#/ui/modules/Chat/ChatBubble/ChatBubble";
import FullScreenToggleButton from "#/ui/molecules/actionButtons/FullScreenToggleButton/FullScreenToggleButton";
import Mouth from "#/ui/atoms/Mouth/Mouth";

type ChatLogProps = {
  chatHistory: ChatMessage[];
  currentResponse?: string;
  className?: string;
  responseLoading?: boolean;
};

export const ChatWindow = (props: ChatLogProps) => {
  const { chatHistory, currentResponse, responseLoading, className } = props;
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
      <div className={cn(styles.ChatWindow, "rounded-b border-t bg-base-100 ", className)}>
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className={cn(styles.chatLog, "my-4 h-full")}>
              {chatHistory.map(
                (message, index) =>
                  (debugMode || message?.role !== "system") && (
                    <ChatBubble key={index} message={message} />
                  ),
              )}
              {!!currentResponse && (
                <ChatBubble
                  key={chatHistory.length}
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
export default ChatWindow;
