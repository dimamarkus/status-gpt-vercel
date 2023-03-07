import cn from 'classnames';
import { ChangeEvent, InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

interface Props extends Omit<InputHTMLAttributes<any>, 'onChange'> {
  className?: string;
  onChange: (value: string) => void;
}
const SupabaseInput = (props: Props) => {
  const { className, children, onChange, ...rest } = props;

  const rootClassName = cn(styles.root, {}, className);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  return (
    <label>
      <input
        className={rootClassName}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </label>
  );
};

export default SupabaseInput;
