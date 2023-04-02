import { sizeMap } from "#/lib/constants/maps";
import { CommonSpacings, ElementProps } from "#/lib/types";
import clsx from "clsx";
import { Component, ElementType, HTMLAttributes } from "react";

export interface DuoProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Which HTML element to use for the Duo.
   * Stick to the container elements 'div', 'ul', 'li', 'section', 'article', 'aside'
   */
  as?: ElementType<ElementProps>;
  /**
   * Reverse the order of the elements
   */
  reverseOrder?: boolean;
  /**
   * Arrange the elements vertically
   */
  centered?: boolean;
  /**
   * Arrange the elements vertically
   */
  vertical?: boolean;
  /**
   * Stretch the elements to fill the width of the container.
   */
  fullWidth?: boolean;
  /**
   * The space between the 2 elements.
   * Can either be full, none or a preset distance.
   */
  gap?: CommonSpacings;
  /**
   * This component is meant to accept 2 chidlren.
   * It can accept one if you want to hide one of the children.
   */
  children: [React.ReactNode, React.ReactNode];
  /**
   * Override classes from the parent. Meant for positioning.
   */
  className?: string;
}
export const Duo = (props: DuoProps) => {
  const {
    as: Element = "div",
    children,
    fullWidth,
    reverseOrder,
    centered,
    vertical,
    gap = "sm",
  } = props;

  const classNames = clsx(
    "flex",
    vertical && "flex-col",
    centered && "items-center",
    fullWidth && "w-full",
    // Only have specific space if the gap between is not full
    gap === "full"
      ? "justify-between"
      : vertical
      ? `space-y-${sizeMap[gap]}`
      : `space-x-${sizeMap[gap]}`,

    props.className,
  );
  // RENDER
  // ---------------------------------------------------------------------------------------------
  return (
    <Element className={classNames}>
      {children[reverseOrder ? 1 : 0]}
      {children[reverseOrder ? 0 : 1]}
    </Element>
  );
};
export default Duo;
