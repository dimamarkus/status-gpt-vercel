import cn from 'classnames';
import React from 'react';
import styles from './Card.module.scss';

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  title: string;
  description?: string;
  footer?: React.ReactNode;
};

const Card = (props: CardProps) => {
  const { title, description, footer, children, className } = props;
  const tailwindClasses = 'card max-w-lg rounded bg-neutral-100';
  const titleChild = title ? (
    <h3 className="card-title mb-1 text-2xl font-medium">{title}</h3>
  ) : null;
  const descriptionChild = description ? (
    <p className="text-zinc-300">{description}</p>
  ) : null;

  return (
    <div className={cn(styles.Card, tailwindClasses, className)}>
      <div className="card-body">
        {titleChild}
        {descriptionChild}
        {children}
        <div className="card-actions justify-end">{footer}</div>
      </div>
    </div>
  );
};
export default Card;
