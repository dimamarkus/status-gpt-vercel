import type { Meta, StoryObj } from '@storybook/react';

import DarkModeToggle from './DarkModeToggleButton';

const meta: Meta<typeof DarkModeToggle> = {
  component: DarkModeToggle,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof DarkModeToggle>;

export const Default: Story = {
  args: {

  },
};
