import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import Image from "next/image";
import React from "react";
import styles from "./ChatMessageAvatar.module.scss";
import Avatar from "#/ui/atoms/decorations/Avatar/Avatar";
import Mouth from "#/ui/atoms/decorations/Mouth/Mouth";

type ChatMessageAvatarProps = {
  avatarUrl?: string;
  isTalking?: React.ReactNode;
  role?: string;
  className?: string;
};

export const ChatMessageAvatar = (props: ChatMessageAvatarProps) => {
  const { avatarUrl, isTalking, role, className } = props;
  const botAvatar = avatarUrl ? (
    <Image
      src={avatarUrl}
      alt="avatar"
      width={64}
      height={64}
      className="aspect-square object-cover"
    />
  ) : (
    <Mouth animated={!!isTalking} />
  );

  let innerAvatar = botAvatar;

  if (role === "system") {
    innerAvatar = <Cog8ToothIcon className="h-16 w-16" />;
  } else if (role === "user") {
    innerAvatar = <Avatar isUserMessage />;
  }

  return <div className={cn(styles.ChatMessageAvatar, className)}>{innerAvatar}</div>;
};

export default ChatMessageAvatar;
