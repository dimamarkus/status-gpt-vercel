import cn from "classnames";
import React from "react";
import styles from "./Mouth.module.scss";

type MouthProps = {
  children?: React.ReactNode;
  animated?: boolean;
};

export const Mouth = (props: MouthProps) => {
  const { animated } = props;
  return (
    <div className={cn(styles.Mouth)}>
      <div className={cn(styles.monster_container, !!animated && styles.animated)}>
        <div className={styles.monster}>
          <div className={styles.monster__eyes}>
            <div className={styles.monster__eye}></div>
            <div className={styles.monster__eye}></div>
          </div>
          <div className={styles.monster__mouth}>
            <div className={styles.monster__top}></div>
            <div className={styles.monster__bottom}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mouth;
