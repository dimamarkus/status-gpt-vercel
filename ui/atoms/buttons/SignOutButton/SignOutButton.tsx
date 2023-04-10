"use client";
import clsx from "clsx";
import React from "react";
import toast from "react-hot-toast";
import styles from "./SignOutButton.module.scss";
import BaseButton, { BaseButtonProps } from "#/ui/_base/BaseButton/BaseButton";
import { useAuthContext } from "#/lib/contexts/AuthContext";

type SignOutButtonProps = BaseButtonProps & {
  className?: string;
};

/**
 * Accepts 'content' prop which gets copied to the clipboard on click
 */
export const SignOutButton = (props: SignOutButtonProps) => {
  const { className, ...otherProps } = props;
  const { signOut } = useAuthContext();

  const handleSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      console.error("ERROR signing out:", error);
      toast("Error signing out: " + error, {
        icon: "❌",
      });
    }
  };

  return (
    <BaseButton className={className} text="Sign Out" onClick={handleSignOut} {...otherProps} />
  );
};

export default SignOutButton;
