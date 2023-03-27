import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
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
  onClick?: () => void;
};

export const ChatMessageAvatar = (props: ChatMessageAvatarProps) => {
  const { avatarUrl, isTalking, role, className, onClick } = props;
  const botAvatar = avatarUrl ? (
    <Image
      src={avatarUrl}
      alt="avatar"
      width={64}
      height={64}
      className="aspect-square object-cover"
      onClick={onClick}
    />
  ) : (
    <Mouth animated={!!isTalking} onClick={onClick} />
  );

  let innerAvatar = botAvatar;

  if (role === "system") {
    innerAvatar = <Cog8ToothIcon className="h-16 w-16" onClick={onClick} />;
  } else if (role === "user") {
    innerAvatar = <Avatar isUserMessage onClick={onClick} />;
  }

  return <div className={clsx(styles.ChatMessageAvatar, className)}>{innerAvatar}</div>;
};

export default ChatMessageAvatar;
