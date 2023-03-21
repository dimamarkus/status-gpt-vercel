import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";
import styles from "./BaseLink.module.scss";

// export interface BaseLinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
export interface BaseLinkProps extends LinkProps {
  /**
   * Would usually be text but you can wrap anything with this
   */
  children?: React.ReactElement;
  /**
   * Stretch the link to fill the width of its container
   */
  fullWidth?: boolean;
  /**
   * Usually underline shows on hover. This will make it always visible.
   */
  underlined?: boolean;
  /**
   * Render the link to look and behave like a button
   */
  asButton?: boolean;
  /**
   * Link text. Can be used instead of children
   */
  text?: string;
  /**
   * Additional class names to overwritte styles
   */
  className?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const BaseLink = ({
  text,
  asButton,
  fullWidth,
  underlined,
  children,
  className,
  ...htmlLinkProps
}: BaseLinkProps) => {
  const hideUnderline = underlined || asButton;
  return (
    <Link
      className={[
        styles.BaseLink,
        asButton ? "btn" : "link",
        hideUnderline ? "" : "link-hover",
        asButton ? "no-underline" : "",
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...htmlLinkProps}
    >
      {text || children}
    </Link>
  );
};

export default BaseLink;
