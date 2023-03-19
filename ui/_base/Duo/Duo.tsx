import cn from "classnames";
import { cloneElement, HTMLAttributes, ReactElement, ReactNode } from "react";
import styles from "./Duo.module.scss";
import { sizeMap } from "#/lib/constants/maps";

type BasicElement = {
  text: string;
  onClick: () => void;
  type?: ElementType;
};

const DEFAULT_BUTTON_TYPES = ["primary", "secondary", "tertiary"] as ElementType[];

export interface DuoProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  /**
   * Most prominantly colored and will appear first
   */
  primaryElement?: ReactElement<typeof Element>;
  /**
   * Middle button
   */
  secondaryElement?: ReactElement<typeof Element>;
  /**
   * Usually a text link or subdued
   */
  tertiaryElement?: ReactElement<typeof Element>;
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
   * The ElementMap is a shorthand way to create buttons from an array of simple objects.
   * Although it should be used in place of the primary, secondary, and tertiary buttons,
   * they can be used together and the ElementMap will render after the main buttons.
   */
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  buttonMap?: BasicElement[];
  className?: string;
  children: [React.ReactNode, React.ReactNode];
}
export const Duo = (props: DuoProps) => {
  // INITIAL PREP - (variables, functions)
  // ---------------------------------------------------------------------------------------------
  const {
    buttonMap,
    primaryElement,
    secondaryElement,
    tertiaryElement,
    children,
    reverseOrder,
    spread,
    vertical,
    gap = "sm",
    className,
  } = props;

  // const renderElementFromMap = (button: BasicElement, index: number) => (
  //   <Element type={DEFAULT_BUTTON_TYPES[index]} {...button} />
  // );

  // // Prep the third button
  // // ---------------------------------------------------------------------------------------------
  // const spreadClass = props.vertical ? "mt-auto" : reverseOrder ? "mr-auto" : "ml-auto";

  // const secondaryChild = secondaryElement
  //   ? cloneElement(secondaryElement, { type: "secondary" } as ElementProps)
  //   : null;

  // const tertiaryElementProps = {
  //   className: spread ? spreadClass : null,
  // };

  // const tertiaryChild = tertiaryElement
  //   ? cloneElement(tertiaryElement, tertiaryElementProps as ElementProps)
  //   : null;

  // // Create the final array of buttons
  // // ---------------------------------------------------------------------------------------------
  // const arrayFromProps = [primaryElement, secondaryChild, tertiaryChild];
  // const arrayFromMap = buttonMap ? buttonMap.map(renderElementFromMap) : [];
  // const comboArray = [...arrayFromProps, ...arrayFromMap];
  // const finalArray = reverseOrder ? comboArray.reverse() : comboArray;

  // Prepare css classes
  // ---------------------------------------------------------------------------------------------
  const classNames = cn(
    styles.Duo,
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
      {children[0]}
      {children[1]}
    </div>
  );
};
export default Duo;
