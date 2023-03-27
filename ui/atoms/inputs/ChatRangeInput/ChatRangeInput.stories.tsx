import type { Meta, StoryObj } from '@storybook/react';

import ChatRangeInput from './ChatRangeInput';

const meta: Meta<typeof ChatRangeInput> = {
  component: ChatRangeInput,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof ChatRangeInput>;

export const Default: Story = {
  args: {

  },
};
