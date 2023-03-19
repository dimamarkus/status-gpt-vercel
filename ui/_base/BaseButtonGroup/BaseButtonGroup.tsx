import cn from "classnames";
import { cloneElement, HTMLAttributes, ReactElement, ReactNode } from "react";
import styles from "./BaseButtonGroup.module.scss";
import { sizeMap } from "#/lib/constants/maps";
import Button, { ButtonProps, ButtonType } from "#/ui/atoms/buttons/Button/Button";

type BasicButton = {
  text: string;
  onClick: () => void;
  type?: ButtonType;
};

const DEFAULT_BUTTON_TYPES = ["primary", "secondary", "tertiary"] as ButtonType[];

export interface BaseButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  /**
   * Most prominantly colored and will appear first
   */
  primaryButton?: ReactElement<typeof Button>;
  /**
   * Middle button
   */
  secondaryButton?: ReactElement<typeof Button>;
  /**
   * Usually a text link or subdued
   */
  tertiaryButton?: ReactElement<typeof Button>;
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
    <Button type={DEFAULT_BUTTON_TYPES[index]} {...button} />
  );

  // Prep the third button
  // ---------------------------------------------------------------------------------------------
  const spreadClass = props.vertical ? "mt-auto" : reverseOrder ? "mr-auto" : "ml-auto";

  const secondaryChild = secondaryButton
    ? cloneElement(secondaryButton, { type: "secondary" } as ButtonProps)
    : null;

  const tertiaryButtonProps = {
    className: spread ? spreadClass : null,
  };

  const tertiaryChild = tertiaryButton
    ? cloneElement(tertiaryButton, tertiaryButtonProps as ButtonProps)
    : null;

  // Create the final array of buttons
  // ---------------------------------------------------------------------------------------------
  const arrayFromProps = [primaryButton, secondaryChild, tertiaryChild];
  const arrayFromMap = buttonMap ? buttonMap.map(renderButtonFromMap) : [];
  const comboArray = [...arrayFromProps, ...arrayFromMap];
  const finalArray = reverseOrder ? comboArray.reverse() : comboArray;

  // Prepare css classes
  // ---------------------------------------------------------------------------------------------
  const classNames = cn(
    styles.BaseButtonGroup,
    "flex items-center space-x-4",
    vertical ? `space-y-${sizeMap[gap]}` : `space-x-${sizeMap[gap]}`,
    vertical ? "justify-center" : "align-center",
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
