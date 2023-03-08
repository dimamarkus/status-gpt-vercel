import type { Meta, StoryObj } from '@storybook/react';

import Blocks from './Blocks';

const meta: Meta<typeof Blocks> = {
  component: Blocks,
  tags: ['autodocs'],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof Blocks>;

export const Default: Story = {
  args: {

  },
};
