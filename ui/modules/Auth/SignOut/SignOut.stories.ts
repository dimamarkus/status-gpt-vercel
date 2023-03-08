import type { Meta, StoryObj } from '@storybook/react';

import SignOut from './SignOut';

const meta: Meta<typeof SignOut> = {
  component: SignOut,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SignOut>;

export const Default: Story = {
  args: {},
};
