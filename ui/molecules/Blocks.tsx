import React from 'react';
import styles from './Blocks.module.scss';

type BlocksProps = {
  children?: React.ReactNode;
};

export const Blocks = (props: BlocksProps) => {
  const { children = 'My new component' } = props;
  const innerChild = <div>{children}</div>;

  return (
    <div className={styles.Blocks + " " + "flex"}>
      {innerChild}
    </div>
  )
};
export default Blocks;