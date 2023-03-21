import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import { DetailedHTMLProps, TextareaHTMLAttributes, useCallback } from "react";
import styles from "./Textarea.module.scss";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { CHAT_BOT_INPUT_MAX_CHARS } from "#/lib/constants/settings";

export type FormTextareaProps<TFormValues extends FieldValues> = {
  id: string;
  name: Path<TFormValues>;
  label: string;
  className?: string;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const FormTextarea = <TFormValues extends Record<string, any>>({
  id,
  name,
  label,
  register,
  rules,
  errors,
  className,
  ...props
}: FormTextareaProps<TFormValues>): JSX.Element => {
  const errorMessages = !!errors ? errors[name] : null;
  const hasError = !!(errors && errorMessages);
  const hookFieldProps = register?.(name, rules);

  const onChange = useCallback(
    (e: any) => {
      const parent = e.target.parentNode;
      if (!!parent) {
        parent.dataset.value = e.target.value;
        hookFieldProps?.onChange(e);
      }
    },
    [hookFieldProps],
  );

  const fieldProps = {
    id: id,
    name: name,
    "aria-label": label,
    "aria-invalid": !!(errors && errorMessages),
    maxLength: CHAT_BOT_INPUT_MAX_CHARS,
    onChange,
    className: "ring-none ring-transparent",
    ...props,
  };

  return (
    <label className={clsx(styles.root, styles.stacked, hasError && styles.hasError)}>
      {!!register ? <textarea {...hookFieldProps} {...fieldProps} /> : <textarea {...fieldProps} />}
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => <small className="text-red-500">{message}</small>}
      />
    </label>
  );
};

export default FormTextarea;
