import type { Meta, StoryObj } from '@storybook/react';

import SidebarButton from './SidebarButton';

const meta: Meta<typeof SidebarButton> = {
  component: SidebarButton,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof SidebarButton>;

export const Default: Story = {
  args: {

  },
};
