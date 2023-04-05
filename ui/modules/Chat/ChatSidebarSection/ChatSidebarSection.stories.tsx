import type { Meta, StoryObj } from '@storybook/react';

import ChatSidebarSection from './ChatSidebarSection';

const meta: Meta<typeof ChatSidebarSection> = {
  component: ChatSidebarSection,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof ChatSidebarSection>;

export const Default: Story = {
  args: {

  },
};
