import { ButtonHTMLAttributes } from 'react';
import styles from './BaseButton.module.scss';

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Button text label
   */
  text?: string;
  /**
   * Stretch the button to fill the width of its container
   */
  fullWidth?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const BaseButton = ({
  text,
  size = 'lg',
  type = 'button',
  fullWidth,
  className,
  ...htmlButtonProps
}: BaseButtonProps) => {
  return (
    <button
      className={[
        styles.BaseButton,
        'btn',
        `btn-${size}`,
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      type={type}
      {...htmlButtonProps}
    >
      {text}
    </button>
  );
};

export default BaseButton;
