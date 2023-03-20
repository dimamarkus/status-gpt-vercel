import clsx from "clsx";
import React, { ButtonHTMLAttributes, forwardRef, useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import styles from "./SupabaseButton.module.css";

import LoadingDots from "#/ui/examples/supabase/LoadingDots";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "slim" | "flat";
  active?: boolean;
  width?: number;
  loading?: boolean;
  Component?: React.ComponentType;
}

// https://stackoverflow.com/a/67993106
// eslint-disable-next-line react/display-name
const SupabaseButton = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
  const {
    className,
    variant = "flat",
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = "button",
    ...rest
  } = props;
  const ref = useRef(null);
  const rootClassName = clsx(
    styles.SupabaseButton,
    {
      [styles.slim]: variant === "slim",
      [styles.loading]: loading,
      [styles.disabled]: disabled,
    },
    className,
  );
  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="m-0 flex pl-2">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
});

export default SupabaseButton;
