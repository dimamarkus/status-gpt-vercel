import React from "react";
import styles from "./LabeledElement.module.scss";

type LabeledElementProps = {
  children: [React.ReactNode, React.ReactNode];
};

export const LabeledElement = ({ children }: LabeledElementProps) => {
  return (
    <div className={styles.LabeledElement + " " + "flex"}>
      {children[0]}
      {children[1]}
    </div>
  );
};
export default LabeledElement;
