import React, { ElementType, HTMLAttributes } from "react";
import styles from "./Collapsible.module.scss";
import { ElementProps } from "#/lib/types";
import clsx from "clsx";

type CollapsibleProps = Omit<HTMLAttributes<ElementType>, "title"> & {
  /**
   * Which HTML element to use for the collapsible container.
   * Stick to the container elements 'div', 'ul', 'li', 'section', 'article', 'aside'
   */
  as?: ElementType<ElementProps>;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
};

export const Collapsible = (props: CollapsibleProps) => {
  const { as: Element = "div", title, children, className, titleClassName } = props;
  const id = `collapsible-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <Element className={clsx(styles.collapsible, className)}>
      <input type="checkbox" id={id} style={{ display: "none" }} />
      <label htmlFor={id} className={titleClassName}>
        {title}
      </label>
      <div>{children}</div>
    </Element>
  );
};

export default Collapsible;
