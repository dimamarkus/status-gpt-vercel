import type { Meta, StoryObj } from '@storybook/react';

import ChatSidebar from './ChatSidebar';

const meta: Meta<typeof ChatSidebar> = {
  component: ChatSidebar,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof ChatSidebar>;

export const Default: Story = {
  args: {

  },
};
