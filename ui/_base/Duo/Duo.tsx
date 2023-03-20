import { sizeMap } from "#/lib/constants/maps";
import { CommonSpacings } from "#/lib/types";
import cn from "classnames";
import { HTMLAttributes } from "react";
export interface DuoProps extends HTMLAttributes<HTMLDivElement> {
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
  const { children, reverseOrder, centered, vertical, gap = "sm" } = props;

  const classNames = cn(
    "flex",
    vertical && "flex-col",
    centered && "items-center",

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
    <div className={classNames}>
      {children[reverseOrder ? 0 : 1]}
      {children[reverseOrder ? 1 : 0]}
    </div>
  );
};
export default Duo;
