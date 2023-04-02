import { SHIMMER_STYLES } from "#/lib/constants/style-classes";
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
};

export const ChatMessageAvatar = (props: ChatMessageAvatarProps) => {
  const { avatarUrl, isTalking, role, className, onClick, loading } = props;

  const rootStyles =
    "chat-image h-16 w-16 text-center self-auto rounded-xl overflow-hidden flex-shrink-0";

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

  if (loading) {
    innerAvatar = <div className={`h-full w-full animate-pulse bg-white/75 ${SHIMMER_STYLES}`} />;
  } else if (role === "system") {
    innerAvatar = <Cog8ToothIcon className="h-16 w-16" onClick={onClick} />;
  } else if (role === "user") {
    innerAvatar = <Avatar isUserMessage onClick={onClick} />;
  }

  return <div className={clsx(rootStyles, className)}>{innerAvatar}</div>;
};

export default ChatMessageAvatar;
