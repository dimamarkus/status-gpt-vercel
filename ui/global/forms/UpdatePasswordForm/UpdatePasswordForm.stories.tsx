import type { Meta, StoryObj } from '@storybook/react';

import UpdatePasswordForm from './UpdatePasswordForm';

const meta: Meta<typeof UpdatePasswordForm> = {
  component: UpdatePasswordForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof UpdatePasswordForm>;

export const Default: Story = {
  args: {},
};
