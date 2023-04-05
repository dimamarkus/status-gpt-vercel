import type { Meta, StoryObj } from '@storybook/react';

import ChatSettings from './ChatSettings';

const meta: Meta<typeof ChatSettings> = {
  component: ChatSettings,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof ChatSettings>;

export const Default: Story = {
  args: {

  },
};
