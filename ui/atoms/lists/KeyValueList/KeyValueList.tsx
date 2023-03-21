import { sizeMap } from "#/lib/constants/maps";
import { CommonSizes, CommonSpacings } from "#/lib/types";
import Duo, { DuoProps } from "#/ui/_base/Duo/Duo";
import clsx from "clsx";
import React from "react";
import styles from "./KeyValueList.module.scss";

type ListItem = {
  key?: string | React.ReactNode;
  value?: string | React.ReactNode;
};

type KeyValueListProps = {
  /**
   * A list of key/value pairs to be rendered.
   */
  items: ListItem[];
  /**
   * A list of props to be passed to each item.
   */
  itemProps?: Omit<DuoProps, "children">;
  /**
   * The key and value are wrapped and styled
   * This removes the wrapping.
   */
  raw?: boolean;
  /**
   * The space between the 2 elements.
   * Can either be full, none or a preset distance.
   */
  gap?: CommonSizes;
  /**
   * Classes to style the key.
   */
  keyClasses?: string;
  /**
   * Classes to style the value.
   */
  valueClasses?: string;
  /**
   * Classes to style root list container.
   */
  className?: string;
};

export const KeyValueList = (props: KeyValueListProps) => {
  const { items, gap = "sm", raw, itemProps, keyClasses, valueClasses } = props;

  const listStyles = clsx(`space-y-${sizeMap[gap]}`, props.className);
  const keyStyles = clsx("label", keyClasses);
  const valueStyles = clsx(valueClasses);

  const duoProps = {
    as: "li",
    gap: "full",
    centered: true,
    ...itemProps,
  } as DuoProps;

  return (
    <ul className={listStyles}>
      {items.map((item, i) => {
        const { key, value } = item;
        return raw ? (
          <Duo key={i} {...duoProps}>
            {key && key}
            {value && value}
          </Duo>
        ) : (
          <Duo key={i} {...duoProps}>
            {key && <dt className={keyStyles}>{key}</dt>}
            {value && <dd className={valueStyles}>{value}</dd>}
          </Duo>
        );
      })}
    </ul>
  );
};

export default KeyValueList;
