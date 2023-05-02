import React from 'react';
import styles from './LoadingDots.module.scss';
import clsx from 'clsx';

type LoadingDotsProps = {
  className?: string;
};

export const LoadingDots = ({ className }: LoadingDotsProps) => {
  return (
    <div className={clsx(styles.root, "flex gap-1", className)}>
      <div className="bg-neutral-300 p-1 w-2 h-2 rounded-full animate-bounce"></div>
      <div className="bg-neutral-300 p-1 w-2 h-2 rounded-full animate-bounce"></div>
      <div className="bg-neutral-300 p-1 w-2 h-2 rounded-full animate-bounce"></div>
    </div>
  )
};
export default LoadingDots;