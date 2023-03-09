import cn from "classnames";

import Hamburger from "#/ui/atoms/icons/Hamburger";
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
  const { type, className, ...otherProps } = props;

  const buttonProps = {
    ...otherProps,
    type: "button",
  } as BaseButtonProps;

  const getBaseButtonWClasses = (classNames: string) => (
    <BaseButton className={cn(classNames, className)} {...buttonProps} />
  );

  switch (type) {
    case "submit":
      const text = buttonProps.text || "Submit";
      return (
        <BaseButton
          className={cn("btn-primary", className)}
          {...buttonProps}
          text={text}
          type="submit"
          role="submit"
        />
      );
      break;

    case "accent":
      return getBaseButtonWClasses("btn-accent");
      break;

    case "secondary":
      return getBaseButtonWClasses("btn-outline btn-primary");
      break;

    case "tertiary":
      return getBaseButtonWClasses("btn-primary btn-link");
      break;

    case "link":
      return getBaseButtonWClasses("btn-link");
      break;

    case "hamburger":
      return (
        <BaseButton className="btn-square">
          <Hamburger />
        </BaseButton>
      );
      break;

    default:
      return getBaseButtonWClasses("btn-primary");
      break;
  }
};

export default Button;
