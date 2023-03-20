"use client";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Avatar.module.scss";

import { useAvatarContext } from "#/lib/contexts/AvatarContext";

type AvatarProps = {
  isUserMessage?: boolean;
};
const Avatar = ({ isUserMessage }: AvatarProps) => {
  const { avatarUrl, setAvatarUrl } = useAvatarContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          if (newProgress >= 100) {
            clearInterval(interval);
          }
          return newProgress;
        });
      }, 60);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    const response = await fetch("/api/generateAvatar", { method: "POST" });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let result = await response.json();
    const image_url = result?.data[0].url;

    if (!!image_url) {
      setAvatarUrl(image_url);
    }
    setTimeout(function () {
      // Give it a sec for the image to load before hiding the progress
      setIsLoading(false);
      setProgress(0);
    }, 1000);
  };

  return isUserMessage ? (
    <div className="placeholder avatar flex-shrink-0">
      <div className="rounded-md bg-blue-100 text-blue-900 md:w-16">
        <strong>You</strong>
      </div>
    </div>
  ) : (
    <div
      className={clsx(
        styles.Avatar,
        "align-center avatar justify-center",
        !isLoading && "cursor-pointer",
        isLoading && "fixed",
      )}
      onClick={handleClick}
    >
      <div className="flex w-12 rounded-md md:w-16">
        {/* ! TODO - Fix the progrss bar without Daisy ui */}
        <div
        // value={progress}
        // thickness={!isLoading ? "0" : undefined}
        // className="w-auto h-auto radial-progress text-info"
        // style={{ "--value": value }}
        >
          <Image src={avatarUrl} alt="avatar" width={64} height={64} className="aspect-square" />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
