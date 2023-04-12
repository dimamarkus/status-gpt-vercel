import Image from "next/image";
import clsx from "clsx";
import { ButtonHTMLAttributes, cloneElement, ReactElement } from "react";
import { iconSizeMap } from "#/lib/constants/maps";
import Link, { LinkProps } from "next/link";

export type ButtonFlavor = "solid" | "textOnly" | "bare" | "icon" | "hollow";
export type ButtonTheme =
  | "primary"
  | "secondary"
  | "accent"
  | "warning"
  | "error"
  | "success"
  | "neutral";
export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  /**
   *
   */
  href?: LinkProps["href"];
  /**
   *
   */
  icon?: ReactElement<SVGElement> | string;
  /**
   * Button text label
   */
  text?: string;
  /**
   * How large should the button be?
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * Extends the default button types
   */
  flavor?: ButtonFlavor;
  /**
   * Colors of the button (primary, secondary, tertiary, etc.)
   */
  theme?: ButtonTheme;
  /**
   * Stretch the button to fill the width of its container
   */
  fullWidth?: boolean;
  /**
   * Usually underline shows on hover. This will make it always visible.
   */
  underlined?: boolean;
  /**
   * Allow button content to wrap
   */
  wrap?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const BaseButton = (props: BaseButtonProps) => {
  const {
    icon,
    text,
    size = "md",
    flavor = "solid",
    theme = "primary",
    wrap,
    fullWidth,
    className,
    children,
    ...elementProps
  } = props;

  const isTextOnly = flavor === "textOnly";
  const isBare = flavor === "bare" || flavor === "icon";
  const isHollow = flavor === "hollow";

  const getColorClass = () => {
    if (isTextOnly || isBare) {
      return `bg-transparent hover:bg-transparent link-${theme}`;
    } else if (isHollow) {
      return `btn btn-outline link-${theme}`;
    }
    return `btn btn-${theme} `;
  };

  const buttonStyles = clsx(
    "h-fit",
    getColorClass(),
    icon && text && "gap-2",
    icon && !text && "p-1 min-h-fit",
    isBare && "w-fit min-h-fit p-0 capitalize",
    isBare && !className?.includes("border") && "border-none", // Allow individual borders to be added to bare buttons
    isTextOnly && "btn border-none hover:underline",
    !wrap && "flex-nowrap",
    size ? `btn-${size}` : "",
    fullWidth ? "w-full" : "",
    className,
  );

  const iconSize = iconSizeMap[size] || 4;
  const iconStyles = `h-${iconSize} w-${iconSize}`;
  const iconChild =
    typeof icon === "string" ? (
      <Image src={icon} alt="" width="16" height="16" className={`h-${iconSize} w-${iconSize}`} />
    ) : (
      !!icon && cloneElement(icon, { className: iconStyles })
    );

  return !!elementProps.href ? (
    <Link className={buttonStyles} href={elementProps.href} {...elementProps}>
      {iconChild}
      {text}
      {children}
    </Link>
  ) : (
    <button className={buttonStyles} {...elementProps}>
      {iconChild}
      {text}
      {children}
    </button>
  );
};

export default BaseButton;
