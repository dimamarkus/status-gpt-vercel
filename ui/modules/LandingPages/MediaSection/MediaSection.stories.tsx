import type { Meta, StoryObj } from '@storybook/react';

import MediaSection from './MediaSection';

const meta: Meta<typeof MediaSection> = {
  component: MediaSection,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof MediaSection>;

export const Default: Story = {
  args: {

  },
};
