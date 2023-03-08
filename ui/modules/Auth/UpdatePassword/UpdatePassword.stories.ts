import type { Meta, StoryObj } from '@storybook/react';

import UpdatePassword from './UpdatePassword';

const meta: Meta<typeof UpdatePassword> = {
  component: UpdatePassword,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UpdatePassword>;

export const Default: Story = {
  args: {},
};
