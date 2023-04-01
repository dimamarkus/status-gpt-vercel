import type { Meta, StoryObj } from '@storybook/react';

import ChatModelSelect from './ChatModelSelect';

const meta: Meta<typeof ChatModelSelect> = {
  component: ChatModelSelect,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof ChatModelSelect>;

export const Default: Story = {
  args: {

  },
};
