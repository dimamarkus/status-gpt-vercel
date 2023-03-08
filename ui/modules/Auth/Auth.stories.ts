import type { Meta, StoryObj } from '@storybook/react';

import Auth from './Auth';

const meta: Meta<typeof Auth> = {
  component: Auth,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Auth>;

export const Default: Story = {
  args: {},
};
