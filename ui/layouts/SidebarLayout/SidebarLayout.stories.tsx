import type { Meta, StoryObj } from '@storybook/react';

import SidebarLayout from './SidebarLayout';

const meta: Meta<typeof SidebarLayout> = {
  component: SidebarLayout,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SidebarLayout>;

export const Default: Story = {
  args: {},
};
