import Button, { ButtonProps, ButtonType } from '#/ui/atoms/Button/Button';
import cn from 'classnames';
import { cloneElement, HTMLAttributes, ReactElement, ReactNode } from 'react';
import styles from './BaseButtonGroup.module.scss';

type BasicButton = {
  text: string;
  onClick: () => void;
  type?: ButtonType;
};

const DEFAULT_BUTTON_TYPES = [
  'primary',
  'secondary',
  'tertiary',
] as ButtonType[];

export interface BaseButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  /**
   * Most prominantly colored and will appear first
   */
  primaryButton?: ReactElement<typeof Button>;
  /**
   * Middle button
   */
  secondaryButton?: ReactElement<typeof Button>;
  /**
   * Usually a text link or subdued
   */
  tertiaryButton?: ReactElement<typeof Button>;
  /**
   * Reverse the order that buttons are rendered
   */
  reverseOrder?: boolean;
  /**
   * Arrange the buttons vertically
   */
  vertical?: boolean;
  /**
   * Pushes the Tertiary button away from the others
   */
  split?: boolean;
  /**
   * The ButtonMap is a shorthand way to create buttons from an array of simple objects.
   * Although it should be used in place of the primary, secondary, and tertiary buttons,
   * they can be used together and the ButtonMap will render after the main buttons.
   */
  buttonMap?: BasicButton[];
  children?: ReactNode;
}
export const BaseButtonGroup = (props: BaseButtonGroupProps) => {
  // INITIAL PREP - (variables, functions)
  // ---------------------------------------------------------------------------------------------
  const {
    buttonMap,
    children,
    primaryButton,
    secondaryButton,
    tertiaryButton,
    reverseOrder,
    split,
    vertical,
  } = props;

  const renderButtonFromMap = (button: BasicButton, index: number) => (
    <Button type={DEFAULT_BUTTON_TYPES[index]} {...button} />
  );

  // Prep the third button
  // ---------------------------------------------------------------------------------------------
  const splitClass = props.vertical
    ? 'mt-auto'
    : reverseOrder
    ? 'mr-auto'
    : 'ml-auto';

  const secondaryChild = secondaryButton
    ? cloneElement(secondaryButton, { type: 'secondary' } as ButtonProps)
    : null;

  const tertiaryButtonProps = {
    className: split ? splitClass : null,
  };

  const tertiaryChild = tertiaryButton
    ? cloneElement(tertiaryButton, tertiaryButtonProps as ButtonProps)
    : null;

  // Create the final array of buttons
  // ---------------------------------------------------------------------------------------------
  const arrayFromProps = [primaryButton, secondaryChild, tertiaryChild];
  const arrayFromMap = buttonMap ? buttonMap.map(renderButtonFromMap) : [];
  const comboArray = [...arrayFromProps, ...arrayFromMap];
  const finalArray = reverseOrder ? comboArray.reverse() : comboArray;

  // RENDER
  // ---------------------------------------------------------------------------------------------
  return (
    <div
      className={cn(
        styles.BaseButtonGroup,
        'flex items-center',
        vertical ? 'space-y-4' : 'space-x-4',
        vertical ? 'justify-center' : 'align-center',
        vertical && 'flex-col',
        reverseOrder && vertical
          ? 'flex-row-reverse'
          : reverseOrder && 'flex-column-reverse',
      )}
    >
      {children}
      {finalArray}
    </div>
  );
};
export default BaseButtonGroup;
