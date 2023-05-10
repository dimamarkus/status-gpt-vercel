import { sizeMap } from "#/lib/constants/maps";
import BaseButton, { BaseButtonProps, ButtonTheme } from "#/ui/_base/BaseButton/BaseButton";
import clsx from "clsx";
import { cloneElement, HTMLAttributes, ReactElement, ReactNode } from "react";
import styles from "./BaseButtonGroup.module.scss";

type BasicButton = {
  text: string;
  onClick: () => void;
  theme?: ButtonTheme;
};

const DEFAULT_BUTTON_FLAVORS = ["primary", "secondary", "tertiary"] as ButtonTheme[];

export interface BaseButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  /**
   * Most prominantly colored and will appear first
   */
  primaryButton?: ReactElement<typeof BaseButton>;
  /**
   * Middle button
   */
  secondaryButton?: ReactElement<typeof BaseButton>;
  /**
   * Usually a text link or subdued
   */
  tertiaryButton?: ReactElement<typeof BaseButton>;
  /**
   * Reverse the order that buttons are rendered
   */
  reverseOrder?: boolean;
  /**
   * Arrange the buttons vertically
   */
  vertical?: boolean;
  /**
   * Pushes the Tertiary button away from the others
   */
  spread?: boolean;
  /**
   * The ButtonMap is a shorthand way to create buttons from an array of simple objects.
   * Although it should be used in place of the primary, secondary, and tertiary buttons,
   * they can be used together and the ButtonMap will render after the main buttons.
   */
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  buttonMap?: BasicButton[];
  className?: string;
  children?: ReactNode;
}
export const BaseButtonGroup = (props: BaseButtonGroupProps) => {
  // INITIAL PREP - (variables, functions)
  // ---------------------------------------------------------------------------------------------
  const {
    buttonMap,
    children,
    primaryButton,
    secondaryButton,
    tertiaryButton,
    reverseOrder,
    spread,
    vertical,
    gap = "sm",
    className,
  } = props;

  const renderButtonFromMap = (button: BasicButton, index: number) => (
    <BaseButton theme={DEFAULT_BUTTON_FLAVORS[index]} {...button} />
  );

  // Prep the third button
  // ---------------------------------------------------------------------------------------------
  const spreadClass = props.vertical ? "mt-auto" : reverseOrder ? "mr-auto" : "ml-auto";

  const secondaryChild = secondaryButton
    ? cloneElement(secondaryButton, { theme: "secondary" } as BaseButtonProps)
    : null;

  const tertiaryButtonProps = {
    className: spread ? spreadClass : null,
  };

  const tertiaryChild = tertiaryButton
    ? cloneElement(tertiaryButton, tertiaryButtonProps as BaseButtonProps)
    : null;

  // Create the final array of buttons
  // ---------------------------------------------------------------------------------------------
  const arrayFromProps = [primaryButton, secondaryChild, tertiaryChild];
  const arrayFromMap = buttonMap ? buttonMap.map(renderButtonFromMap) : [];
  const comboArray = [...arrayFromProps, ...arrayFromMap];
  const finalArray = reverseOrder ? comboArray.reverse() : comboArray;

  // Prepare css classes
  // ---------------------------------------------------------------------------------------------
  const classNames = clsx(
    styles.BaseButtonGroup,
    "flex items-center space-x-4",
    vertical ? `space-y-${sizeMap[gap]}` : `space-x-${sizeMap[gap]}`,
    vertical ? "justify-center" : "items-center",
    vertical && "flex-col",
    reverseOrder && vertical ? "flex-row-reverse" : reverseOrder && "flex-column-reverse",
    className,
  );

  // RENDER
  // ---------------------------------------------------------------------------------------------
  return (
    <div className={classNames}>
      {children}
      {finalArray}
    </div>
  );
};
export default BaseButtonGroup;
