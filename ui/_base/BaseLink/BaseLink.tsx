import BaseButton, { BaseButtonProps } from "#/ui/_base/BaseButton/BaseButton";
import clsx from "clsx";
import { LinkProps } from "next/link";

export type ALinkProps = BaseButtonProps &
  LinkProps & {
    href: LinkProps["href"];
  };

export const BaseLink = (props: ALinkProps) => {
  const { flavor = "link", ...otherProps } = props;
  const rootStyles = clsx("hover:underline", props.className);

  return <BaseButton flavor="bare" {...otherProps} className={rootStyles} />;
};

export default BaseLink;
