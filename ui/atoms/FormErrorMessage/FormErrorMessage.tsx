import classNames from "classnames";
import { FC } from "react";

export type FormErrorMessageProps = {
  children: React.ReactNode;
  className?: string;
};

export const FormErrorMessage: FC<FormErrorMessageProps> = ({ children, className }) => (
  <p className={classNames("block text-left font-serif text-sm text-red-600", className)}>
    {children}
  </p>
);
