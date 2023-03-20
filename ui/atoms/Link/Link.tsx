import clsx from "clsx";

import BaseLink, { BaseLinkProps } from "#/ui/_base/BaseLink/BaseLink";

export type LinkType = "default" | "primary" | "secondary" | "danger" | "accent";

// export interface LinkProps extends LinkHTMLAttributes<HTMLLinkElement> {
export interface LinkProps extends Omit<BaseLinkProps, "type"> {
  href: string;
  /**
   * What flavor of link is it?
   */
  type?: LinkType;
}

/**
 * Primary UI component for user interaction
 */
export const Link = (props: LinkProps) => {
  const { type, className, ...otherProps } = props;

  const linkProps = {
    ...otherProps,
  } as BaseLinkProps;

  const getBaseLinkWClasses = (classNames: string) => (
    <BaseLink className={clsx(classNames, className)} {...linkProps} />
  );

  const asButton = linkProps.asButton;
  const classPrefix = asButton ? "btn" : "link";
  switch (type) {
    case "accent":
      return getBaseLinkWClasses(`${classPrefix}-accent`);
      break;

    case "secondary":
      return getBaseLinkWClasses(asButton ? "btn-outline btn-primary" : "link-neutral");
      break;

    case "danger":
      return getBaseLinkWClasses(`${classPrefix}-error`);
      break;

    default:
      return getBaseLinkWClasses(`${classPrefix}-primary`);
      break;
  }
};

export default Link;
