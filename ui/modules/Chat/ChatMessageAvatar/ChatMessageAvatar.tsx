import { SHIMMER_STYLES } from "#/lib/constants/style-classes";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import Avatar from "#/ui/atoms/decorations/Avatar/Avatar";
import Mouth from "#/ui/atoms/decorations/Mouth/Mouth";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

type ChatMessageAvatarProps = {
  avatarUrl?: string;
  isTalking?: React.ReactNode;
  role?: string;
  className?: string;
  loading?: boolean;
  onClick?: () => void;
  size?: "sm" | "lg";
};

export const ChatMessageAvatar = (props: ChatMessageAvatarProps) => {
  const { avatarUrl, isTalking, role, className, onClick, loading, size = "lg" } = props;

  const disableClick = onClick === undefined;

  const rootStyles = clsx(
    "chat-image text-center self-auto overflow-hidden flex-shrink-0",
    size === "sm" ? "rounded-lg" : "rounded-xl",
    disableClick && " pointer-events-none",
  );

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

  const handleClick = () => {
    onClick && onClick();
  };

  let innerAvatar = botAvatar;

  if (loading) {
    innerAvatar = <div className={`h-full w-full animate-pulse bg-white/75 ${SHIMMER_STYLES}`} />;
  } else if (role === "system") {
    innerAvatar = <Cog8ToothIcon className="h-16 w-16" />;
  } else if (role === "user") {
    innerAvatar = <Avatar isUserMessage />;
  }

  return (
    <button className={clsx(rootStyles, className)} onClick={handleClick} disabled={disableClick}>
      {innerAvatar}
    </button>
  );
};

export default ChatMessageAvatar;
