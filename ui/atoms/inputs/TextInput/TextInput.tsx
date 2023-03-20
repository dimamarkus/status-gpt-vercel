import clsx from "clsx";
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
import { CommonSizes } from "#/lib/types";

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
   * Determines if the label is nested inside the input or not
   */
  compact?: boolean;
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
    compact,
    ...inputProps
  } = props;

  // Using maps so that the full Tailwind classes can be seen for purging
  // see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
  const labelSizeMap: { [key in CommonSizes]: string } = {
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-md",
    xl: "text-lg",
  };
  // see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
  const sizeMap: { [key in CommonSizes]: string } = {
    xs: "p-1 text-xs",
    sm: "p-2 text-sm",
    md: "p-3",
    lg: "p-4 text-md",
    xl: "p-5 text-lg",
  };

  const labelChild = !!label && (
    <span className={cn("label-text", labelSizeMap[size])}>{label}</span>
  );
  const isString = typeof topRight === "string";
  const hintChild = !!hint && <small className="label">{hint}</small>;
  const topRightChild = isString ? <div className="label-text-alt">{topRight}</div> : topRight;
  const errorsArray = Array.isArray(errors) ? errors : [errors];
  const errorsChild = !!errors && touched && (
    <div className="label">
      <span className="label-text-alt text-red-500">
        {errorsArray.map((error, i) => (
          <span key={i}>
            {error}
            <br />
          </span>
        ))}
      </span>
    </div>
  );

  const fieldProps: InputHTMLAttributes<HTMLInputElement> = {
    ...inputProps,
    name,
    id: name,
    // className: "relative inline-flex w-full rounded border border-gray-300 bg-gray-50 leading-none text-gray-700 placeholder-gray-500 transition-colors ease-in-out hover:border-blue-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-30",
    className: clsx(sizeMap[size], "input-bordered input h-auto"),
  };

  console.log("errors", errors);
  console.log("errorsArray", errorsArray);

  return (
    <div className={clsx(styles.root, "form-control", compact && styles.compact, className)}>
      <label className="label pb-0" htmlFor={name}>
        {labelChild}
        {topRightChild}
      </label>
      {!compact && hintChild}
      {!!register ? (
        <input {...register(name, rules)} {...fieldProps} />
      ) : (
        <input name={name} {...fieldProps} />
      )}
      {hintChild}
      {errorsChild || (compact && hintChild)}
    </div>
  );
};

export default TextInput;
