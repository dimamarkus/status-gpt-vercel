import type { Meta, StoryObj } from '@storybook/react';

import SignOutButton from './SignOutButton';

const meta: Meta<typeof SignOutButton> = {
  component: SignOutButton,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof SignOutButton>;

export const Default: Story = {
  args: {

  },
};
