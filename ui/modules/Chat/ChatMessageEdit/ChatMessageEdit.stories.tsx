import type { Meta, StoryObj } from '@storybook/react';

import ChatMessageEdit from './ChatMessageEdit';

const meta: Meta<typeof ChatMessageEdit> = {
  component: ChatMessageEdit,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof ChatMessageEdit>;

export const Default: Story = {
  args: {

  },
};
