import type { Meta, StoryObj } from '@storybook/react';

import ChatHeader from './ChatHeader';

const meta: Meta<typeof ChatHeader> = {
  component: ChatHeader,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof ChatHeader>;

export const Default: Story = {
  args: {

  },
};
