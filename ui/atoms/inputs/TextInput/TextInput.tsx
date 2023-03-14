import cn from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styles from "./TextInput.module.scss";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { CommonSizes } from "#/types";

// export type TextInputProps<TFormValues extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
export type TextInputProps<TFormValues extends FieldValues> = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
> & {
  /**
   * The main parameter which makes multiple things work within
   */
  name: Path<TFormValues>;
  /**
   * The text on top of the input on the top left
   */
  label?: string; // Top left
  /**
   * The text under the input on the bottom left
   */
  hint?: string; // Bottom left
  /**
   * The top right section can be a string or a JSX element such as a link
   */
  topRight?: string | JSX.Element; // Top  right
  /**
   * If you're using react-hook-form, you can pass in the touched state
   */
  touched?: boolean;
  /**
   * Size of the input. Shrinks the padding and font size.
   */
  size?: CommonSizes;
  /**
   * Error map from react-hook-form
   */
  errors?: string[] | string;
  /**
   * If you're using react-hook-form, you can pass in the register function
   */
  register?: UseFormRegister<TFormValues>;
  /**
   * Set custom rules directly on a field if you want.
   */
  rules?: RegisterOptions;
  /**
   * Add classes to the root wrapper of the lable and input
   */
  className?: string;
};

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<TextInputProps<TFormValues>, "name">;

export const TextInput = <TFormValues extends Record<string, unknown>>(
  props: TextInputProps<TFormValues>,
) => {
  const {
    name,
    errors,
    hint,
    label,
    topRight = null,
    register,
    touched,
    rules,
    size = "md",
    className,
    ...inputProps
  } = props;

  const labelChild = !!label && (
    <label className="label-text" htmlFor={name}>
      {label}
    </label>
  );
  const hintChild = !!hint && <span className="label-text">{hint}</span>;
  const isString = typeof topRight === "string";
  const topRightChild = isString ? <span className="label-text-alt">{topRight}</span> : topRight;
  const errorsArray = Array.isArray(errors) ? errors : [errors];
  const errorsChild = !!errors && touched && (
    <span className="label-text-alt text-red-500">
      {errorsArray.map((error, i) => (
        <span key={i}>
          {error}
          <br />
        </span>
      ))}
    </span>
  );

  // Using maps so that the full Tailwind classes can be seen for purging
  // see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
  const sizeMap: { [key in CommonSizes]: string } = {
    xs: "p-1 text-xs",
    sm: "p-2 text-sm",
    md: "p-3",
    lg: "p-4 text-md",
    xl: "p-5 text-lg",
  };
  const fieldProps: InputHTMLAttributes<HTMLInputElement> = {
    ...inputProps,
    name,
    id: name,
    // className: "relative inline-flex w-full rounded border border-gray-300 bg-gray-50 leading-none text-gray-700 placeholder-gray-500 transition-colors ease-in-out hover:border-blue-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-30",
    className: cn(sizeMap[size], "input-bordered input"),
  };

  return (
    <div className={cn(styles.TextInput, "form-control", className)}>
      <div className="label">
        {labelChild}
        {topRightChild}
      </div>
      {!!register ? (
        <input {...register(name, rules)} {...fieldProps} />
      ) : (
        <input name={name} {...fieldProps} />
      )}
      <div className="label">{errorsChild || hintChild}</div>
    </div>
  );
};

export default TextInput;
