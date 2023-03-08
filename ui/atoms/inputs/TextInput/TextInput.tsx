import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './TextInput.module.scss';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * The main parameter which makes multiple things work within
   */
  name: string;
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
   * Multiple errors are supported
   */
  errors?: string | string[];
  /**
   * If you're using react-hook-form, you can pass in the register function
   */
  register?: UseFormRegister<any>;
};

const TextInput = (props: TextInputProps) => {
  const {
    name,
    errors,
    hint,
    label,
    topRight = null,
    register,
    touched,
    ...inputProps
  } = props;

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

  const hintChild = !!hint && <span className="label-text">{hint}</span>;

  const labelChild = !!label && (
    <label className="label-text" htmlFor={name}>
      {label}
    </label>
  );

  const topRightChild =
    typeof topRight === 'string' ? (
      <span className="label-text-alt">{topRight}</span>
    ) : (
      topRight
    );

  const fieldProps: InputHTMLAttributes<HTMLInputElement> = {
    ...inputProps,
    name,
    id: name,
    className: 'input-bordered input',
  };

  return (
    <div className={styles.TextInput + ' ' + 'form-control'}>
      <div className="label">
        {labelChild}
        {topRightChild}
      </div>
      {!!register ? (
        <input {...register(name)} {...fieldProps} />
      ) : (
        <input name={name} {...fieldProps} />
      )}
      <div className="label">{errorsChild || hintChild}</div>
    </div>
  );
};

export default TextInput;
