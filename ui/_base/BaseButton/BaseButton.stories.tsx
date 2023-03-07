import type { Meta, StoryObj } from '@storybook/react';

import BaseButton from './BaseButton';

const meta: Meta<typeof BaseButton> = {
  component: BaseButton,
  tags: ['autodocs'],
  args: {
    text: 'Click Me',
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

export const Default: Story = {
  args: {},
};
