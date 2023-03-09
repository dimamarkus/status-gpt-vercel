import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ChatWindow.module.scss";
import { AvatarContextProvider, DEFAULT_AVATAR_CONTEXT } from "#/lib/contexts/AvatarContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { ChatMessage } from "#/types";
import ResizablePanel from "#/ui/containers/ResizablePanel/ResizablePanel";
import ChatBubble from "#/ui/modules/Chat/ChatBubble/ChatBubble";
import FullScreenToggleButton from "#/ui/molecules/actionButtons/FullScreenToggleButton/FullScreenToggleButton";

type ChatLogProps = {
  chatHistory: ChatMessage[];
  currentResponse?: string;
  className?: string;
};

export const ChatWindow = (props: ChatLogProps) => {
  const { chatHistory, currentResponse, className } = props;
  const {
    features: { promptDebug },
  } = useFeatureToggleContext();

  return (
    <AvatarContextProvider {...DEFAULT_AVATAR_CONTEXT}>
      <FullScreenToggleButton />
      <div className={cn(styles.ChatWindow, "rounded-b border-t bg-base-100 ", className)}>
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className={cn(styles.chatLog, "my-4 h-full")}>
              {chatHistory.map(
                (message, index) =>
                  (promptDebug || message?.role !== "system") && (
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
                />
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </div>
    </AvatarContextProvider>
  );
};
export default ChatWindow;
