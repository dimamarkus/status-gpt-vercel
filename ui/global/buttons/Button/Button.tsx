import cn from 'classnames';

import BaseButton, { BaseButtonProps } from '#/ui/_base/BaseButton/BaseButton';

export type ButtonType =
  | 'button'
  | 'submit'
  | 'reset'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link'
  | 'default';

// export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
export interface ButtonProps extends Omit<BaseButtonProps, 'type'> {
  /**
   * What flavor of button is it?
   */
  type?: ButtonType;
}

/**
 * Primary UI component for user interaction
 */
export const Button = (props: ButtonProps) => {
  const { type = 'primary', className, ...otherProps } = props;

  const buttonProps = {
    ...otherProps,
    type: 'button',
  } as BaseButtonProps;
  switch (type) {
    case 'submit':
      const text = buttonProps.text || 'Submit';
      return (
        <BaseButton
          className={cn('btn-primary', className)}
          {...buttonProps}
          text={text}
          type="submit"
          role="submit"
        />
      );
      break;

    case 'secondary':
      return (
        <BaseButton
          className={cn('btn-secondary', className)}
          {...buttonProps}
        />
      );
      break;

    case 'tertiary':
      return (
        <BaseButton
          className={cn('btn-tertiary', className)}
          {...buttonProps}
        />
      );
      break;

    case 'link':
      return (
        <BaseButton className={cn('btn-link', className)} {...buttonProps} />
      );
      break;

    default:
      return (
        <BaseButton className={cn('btn-primary', className)} {...buttonProps} />
      );
      break;
  }
};

export default Button;
