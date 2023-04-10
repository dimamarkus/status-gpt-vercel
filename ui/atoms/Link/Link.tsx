import clsx from "clsx";

import BaseLink, { BaseLinkProps } from "#/ui/_base/BaseLink/BaseLink";
import { ButtonFlavor, ButtonTheme } from "#/ui/_base/BaseButton/BaseButton";

export type LinkType = "default" | "primary" | "secondary" | "danger" | "accent";

// export interface LinkProps extends LinkHTMLAttributes<HTMLLinkElement> {
export interface LinkProps extends Omit<BaseLinkProps, "type"> {
  href: string;
  /**
   * What flavor of link is it?
   */
  flavor?: ButtonFlavor;
  /**
   * Themes determine the colors of the link text, background and borders
   */
  theme?: ButtonTheme;
  /**
   * Default HTML title attribute. This type is missing in react for some reason
   */
  title?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Link = (props: LinkProps) => {
  const { theme, className, ...otherProps } = props;

  const linkProps = {
    ...otherProps,
  } as BaseLinkProps;

  const getBaseLinkWClasses = (classNames: string) => (
    <BaseLink className={clsx(classNames, className)} {...linkProps} />
  );

  const asButton = linkProps.asButton;
  const classPrefix = asButton ? "btn" : "link";
  switch (theme) {
    case "accent":
      return getBaseLinkWClasses(`${classPrefix}-accent`);

    case "secondary":
      return getBaseLinkWClasses(asButton ? "btn-outline btn-primary" : "link-neutral");

    case "error":
      return getBaseLinkWClasses(`${classPrefix}-error`);

    default:
      return getBaseLinkWClasses(`${classPrefix}-primary`);
  }
};

export default Link;
