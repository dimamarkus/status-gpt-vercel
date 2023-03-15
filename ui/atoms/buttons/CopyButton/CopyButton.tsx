"use client";
import cn from "classnames";
import React from "react";
import toast from "react-hot-toast";
import styles from "./CopyButton.module.scss";

import Button, { ButtonProps } from "#/ui/atoms/buttons/Button/Button";

type CopyButtonProps = ButtonProps & {
  content: string;
  className?: string;
};

/**
 * Accepts 'content' prop which gets copied to the clipboard on click
 */
export const CopyButton = (props: CopyButtonProps) => {
  const { content, className, ...otherProps } = props;

  return (
    <Button
      className={cn(styles.CopyButton, className)}
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
