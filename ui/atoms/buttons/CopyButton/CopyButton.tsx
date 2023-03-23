"use client";
import clsx from "clsx";
import React from "react";
import toast from "react-hot-toast";
import styles from "./CopyButton.module.scss";
import BaseButton, { BaseButtonProps } from "#/ui/_base/BaseButton/BaseButton";

type CopyButtonProps = BaseButtonProps & {
  content: string;
  className?: string;
};

/**
 * Accepts 'content' prop which gets copied to the clipboard on click
 */
export const CopyButton = (props: CopyButtonProps) => {
  const { content, className, ...otherProps } = props;

  return (
    <BaseButton
      className={clsx(styles.CopyButton, "text-xs", className)}
      flavor="bare"
      theme="secondary"
      text="Copy"
      size="sm"
      onClick={() => {
        navigator.clipboard.writeText(content);
        toast("Message copied to clipboard", {
          icon: "📋",
        });
      }}
      {...otherProps}
    />
  );
};

export default CopyButton;
