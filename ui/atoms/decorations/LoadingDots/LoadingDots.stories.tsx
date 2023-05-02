import type { Meta, StoryObj } from '@storybook/react';

import LoadingDots from './LoadingDots';

const meta: Meta<typeof LoadingDots> = {
  component: LoadingDots,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof LoadingDots>;

export const Default: Story = {
  args: {

  },
};
