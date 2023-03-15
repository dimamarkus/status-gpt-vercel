import cn from "classnames";
import Image from "next/image";
import React from "react";
import styles from "./ChatMessageAvatar.module.scss";
import Avatar from "#/ui/atoms/decorations/Avatar/Avatar";
import Mouth from "#/ui/atoms/decorations/Mouth/Mouth";

type ChatMessageAvatarProps = {
  avatarUrl?: string;
  isUserMessage?: boolean;
  isTalking?: React.ReactNode;
  className?: string;
};

export const ChatMessageAvatar = (props: ChatMessageAvatarProps) => {
  const { avatarUrl, isUserMessage, isTalking, className } = props;
  const botAvatar = avatarUrl ? (
    <Image src={avatarUrl} alt="avatar" width={64} height={64} className="aspect-square" />
  ) : (
    <Mouth animated={!!isTalking} />
  );
  return (
    <div
      className={cn(
        styles.ChatMessageAvatar,
        "align-center chat-image flex h-16 w-16 justify-center text-center",
        className,
      )}
    >
      {isUserMessage ? <Avatar isUserMessage /> : botAvatar}
    </div>
  );
};

export default ChatMessageAvatar;
