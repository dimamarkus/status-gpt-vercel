import React, { ElementType, HTMLAttributes } from "react";
import styles from "./Loader.module.scss";
import { SHIMMER_STYLES } from "#/lib/constants/style-classes";
import clsx from "clsx";
import { type } from "cypress/types/jquery";
import { string } from "yup";
import { ElementProps } from "#/lib/types";

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType<ElementProps>;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "small";
  children?: React.ReactNode;
  className?: string;
  shimmer?: boolean;
  speed?: "slow" | "medium" | "fast" | "fastest";
}

export const Loader = (props: LoaderProps) => {
  const { as: Element = "div", children, shimmer = true, speed, className } = props;
  let loaderStyles: string[] = shimmer ? [SHIMMER_STYLES] : [];

  const textElements = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "span",
    "small",
  ] as ElementType<ElementProps>[];

  if (textElements.includes(Element)) loaderStyles.push("bg-blue-300");

  speed && loaderStyles.push(`animate-width-${speed}`);

  if (Element === "h1") {
    loaderStyles.push("h-7 mb-4 w-20");
  } else if (Element === "h2") {
    loaderStyles.push("h-5 mb-3 w-16");
  } else if (Element === "h3" || Element === "h4") {
    loaderStyles.push("h-4 mb-3 w-20");
  } else if (Element === "h5" || Element === "h6") {
    loaderStyles.push("h-4 mb-2 w-20");
  } else if (Element === "p") {
    loaderStyles.push("h-8 mb-2 w-24");
  } else if (Element === "small") {
    loaderStyles.push("h-2 mb-1 w-24");
  }

  className && loaderStyles.push(className);

  return <Element className={clsx(loaderStyles)}>{children}</Element>;
};
export default Loader;
