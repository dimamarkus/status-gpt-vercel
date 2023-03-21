import type { Meta, StoryObj } from '@storybook/react';

import Timestamp from './Timestamp';

const meta: Meta<typeof Timestamp> = {
  component: Timestamp,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof Timestamp>;

export const Default: Story = {
  args: {

  },
};
