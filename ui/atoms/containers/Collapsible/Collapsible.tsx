import { ElementProps } from "#/lib/types";
import clsx from "clsx";
import React, { ElementType, HTMLAttributes } from "react";
import styles from "./Collapsible.module.scss";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

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
  disabled?: boolean
  onClick?: () => void
};

/**
 * @deprecated The method should not be used
 */
export const Collapsible = (props: CollapsibleProps) => {
  const { as: Element = "div", title, children, className, titleClassName, slug, peekOnHover, disabled, onClick } = props;

  const id = `collapsible-${slug}`;

  return (
    <Element className={clsx(styles.collapsible, peekOnHover && styles.peekOnHover, className)}>
      <input type="checkbox" id={id} style={{ display: "none" }} className="peer"  />
      <label htmlFor={id} className={titleClassName} onClick={ onClick }>
        {title}
      </label>
      <div className={styles.collapsibleContent}>{children}</div>
      {
        !disabled && <ChevronRightIcon
          width={12}
          height={12}
          className="animate-rotate ml-auto peer-checked:rotate-90 absolute sm:top-[22px] top-6 right-4 transform transition-transform duration-300"
        />
      }
    </Element>
  );
};

export default Collapsible;
