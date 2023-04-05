import type { Meta, StoryObj } from '@storybook/react';

import ChatBots from './ChatBots';

const meta: Meta<typeof ChatBots> = {
  component: ChatBots,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof ChatBots>;

export const Default: Story = {
  args: {

  },
};
