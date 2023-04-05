import type { Meta, StoryObj } from '@storybook/react';

import Boundary from './Boundary';

const meta: Meta<typeof Boundary> = {
  component: Boundary,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof Boundary>;

export const Default: Story = {
  args: {

  },
};
