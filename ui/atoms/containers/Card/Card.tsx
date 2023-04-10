import clsx from "clsx";
import React from "react";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
};

export const Card = (props: CardProps) => {
  const { title, description, footer, children, className } = props;
  const rootClasses = "card bg-base-100 w-full";
  const titleChild = title ? (
    <h3 className="card-title mb-1 text-2xl font-medium">{title}</h3>
  ) : null;
  const descriptionChild = description ? <p className="text-zinc-300">{description}</p> : null;

  return (
    <div className={clsx(rootClasses, className)}>
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
