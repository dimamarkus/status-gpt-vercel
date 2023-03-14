import cn from "classnames";
import styles from "./ChatMessages.module.scss";
import { createChatBotMessage } from "#/features/chat/helpers/chat-helpers";
import { StatusChatMessage } from "#/types";
import Mouth from "#/ui/atoms/Mouth/Mouth";
import { ChatMessage } from "#/ui/modules/Chat/ChatMessage/ChatMessage";

type ChatMessagesProps = {
  botAvatarUrl?: string;
  messages: StatusChatMessage[];
  currentResponse?: string;
  className?: string;
  responseLoading?: boolean;
};

export const ChatMessages = (props: ChatMessagesProps) => {
  const { botAvatarUrl, messages, currentResponse, responseLoading, className } = props;
  const debugMode = false;

  const avatarClasses = "align-center chat-image flex h-16 w-16 justify-center text-center";
  const avatarChild = (
    <div className={cn(avatarClasses, "absolute bottom-4 left-4")}>
      <Mouth animated={true} />
    </div>
  );

  return (
    <div className={cn(styles.ChatMessages, "rounded-b border-t bg-base-100 ", className)}>
      <div className={cn(styles.chatLog, "my-4 h-full")}>
        {messages.map(
          (message, index) =>
            (debugMode || message?.role !== "system") && (
              <ChatMessage key={index} message={message} avatarUrl={botAvatarUrl} />
            ),
        )}
        {!!currentResponse && (
          <ChatMessage
            avatarUrl={botAvatarUrl}
            key={messages.length}
            message={createChatBotMessage(currentResponse)}
            isTalking={responseLoading}
          />
        )}
        {responseLoading && avatarChild}
      </div>
    </div>
  );
};
export default ChatMessages;
