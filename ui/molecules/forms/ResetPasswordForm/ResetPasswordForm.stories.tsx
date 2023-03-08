import type { Meta, StoryObj } from '@storybook/react';

import ResetPasswordForm from './ResetPasswordForm';

const meta: Meta<typeof ResetPasswordForm> = {
  component: ResetPasswordForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ResetPasswordForm>;

export const Default: Story = {
  args: {},
};
