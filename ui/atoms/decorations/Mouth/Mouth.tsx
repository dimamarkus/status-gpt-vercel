import clsx from "clsx";
import React from "react";
import styles from "./Mouth.module.scss";

type MouthProps = {
  children?: React.ReactNode;
  animated?: boolean;
  onClick?: () => void;
};

export const Mouth = (props: MouthProps) => {
  const { animated, onClick } = props;
  return (
    <div className={clsx(styles.Mouth)} onClick={onClick}>
      <div className={clsx(styles.monster_container, !!animated && styles.animated)}>
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
