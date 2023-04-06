import { ElementProps } from "#/lib/types";
import clsx from "clsx";
import React, { ElementType, HTMLAttributes } from "react";
import styles from "./Collapsible.module.scss";

type CollapsibleProps = Omit<HTMLAttributes<ElementType>, "title"> & {
  /**
   * Which HTML element to use for the collapsible container.
   * Stick to the container elements 'div', 'ul', 'li', 'section', 'article', 'aside'
   */
  as?: ElementType<ElementProps>;
  // Unique identifier for this collapse section
  slug: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  peekOnHover?: boolean
};

export const Collapsible = (props: CollapsibleProps) => {
  const { as: Element = "div", title, children, className, titleClassName, slug, peekOnHover } = props;

  const id = `collapsible-${slug}`;

  return (
    <Element className={clsx(styles.collapsible, peekOnHover && styles.peekOnHover, className)}>
      <input type="checkbox" id={id} style={{ display: "none" }} />
      <label htmlFor={id} className={titleClassName}>
        {title}
      </label>
      <div>{children}</div>
    </Element>
  );
};

export default Collapsible;
