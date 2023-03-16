import React from "react";
import styles from "./Toggle.module.scss";

type ToggleProps = {
  children?: React.ReactNode;
};

export const Toggle = (props: ToggleProps) => {
  const { children = "My new component" } = props;
  const innerChild = <div>{children}</div>;

  return (
    <input type="checkbox" className={styles.Toggle + " " + "toggle-warning toggle"} checked />
  );
};
export default Toggle;
