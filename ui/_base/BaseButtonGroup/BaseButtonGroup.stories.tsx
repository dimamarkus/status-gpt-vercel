import Button from '#/ui/atoms/buttons/Button/Button';
import type { Meta, StoryObj } from '@storybook/react';

import BaseButtonGroup from './BaseButtonGroup';

const meta: Meta<typeof BaseButtonGroup> = {
  component: BaseButtonGroup,
  tags: ['autodocs'],
  args: {
    primaryButton: <Button text="Primary" onClick={() => {}} />,
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BaseButtonGroup>;

export const Default: Story = {
  args: {},
};

export const TwoButtons: Story = {
  args: {
    secondaryButton: <Button text="Secondary" type="secondary" />,
  },
};

export const ThreeButtons: Story = {
  args: {
    secondaryButton: <Button text="Secondary" type="secondary" />,
    tertiaryButton: <Button text="Tertiary" type="tertiary" />,
  },
};

export const ThreeButtonsReverse: Story = {
  args: {
    secondaryButton: <Button text="Secondary" type="secondary" />,
    tertiaryButton: <Button text="Tertiary" type="tertiary" />,
    reverseOrder: true,
  },
};

export const FromButtonMap: Story = {
  args: {
    buttonMap: [
      {
        text: 'Button 1',
        onClick: () => {},
      },
      {
        text: 'Button 2',
        onClick: () => {},
      },
      {
        text: 'Button 3',
        onClick: () => {},
      },
    ],
  },
};

export const Combined: Story = {
  args: {
    secondaryButton: <Button text="Secondary" type="secondary" />,
    tertiaryButton: <Button text="Tertiary" type="tertiary" />,
    buttonMap: [
      {
        text: 'From map 1',
        onClick: () => {},
      },
      {
        text: 'From map 2',
        onClick: () => {},
      },
      {
        text: 'From map 3',
        onClick: () => {},
      },
    ],
  },
};
