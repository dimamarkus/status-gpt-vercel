import clsx from "clsx";

import Hamburger from "#/ui/atoms/svgs/Hamburger";
import BaseButton, { BaseButtonProps } from "#/ui/_base/BaseButton/BaseButton";

export type ButtonType =
  | "button"
  | "submit"
  | "reset"
  | "accent"
  | "primary"
  | "secondary"
  | "tertiary"
  | "link"
  | "hamburger"
  | "default";

// export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
export interface ButtonProps extends Omit<BaseButtonProps, "type"> {
  /**
   * What flavor of button is it?
   */
  type?: ButtonType;
}

/**
 * Primary UI component for user interaction
 */
export const Button = (props: ButtonProps) => {
  const { children, type, className, ...otherProps } = props;

  const buttonProps = {
    ...otherProps,
    type: "button",
  } as BaseButtonProps;

  const getBaseButtonWClasses = (classNames: string) => (
    <BaseButton className={clsx(classNames, className)} {...buttonProps}>
      {children}
    </BaseButton>
  );

  switch (type) {
    case "submit":
      const text = !children ? buttonProps.text || "Submit" : undefined;
      return (
        <BaseButton
          className={clsx("btn-primary", className)}
          {...buttonProps}
          text={text}
          type="submit"
        >
          {children}
        </BaseButton>
      );

    case "accent":
      return getBaseButtonWClasses("btn-accent");

    case "secondary":
      return getBaseButtonWClasses("btn-outline btn-primary");

    case "tertiary":
      return getBaseButtonWClasses("btn-primary btn-link");

    case "link":
      return getBaseButtonWClasses("btn-link display-block min-h-0 p-0 w-fit h-auto");

    case "hamburger":
      return (
        <BaseButton className="btn-square">
          <Hamburger />
        </BaseButton>
      );

    default:
      return getBaseButtonWClasses("btn-primary");
  }
};

export default Button;
