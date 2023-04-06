import type { Meta, StoryObj } from '@storybook/react';

import BlurbSection from './BlurbSection';

const meta: Meta<typeof BlurbSection> = {
  component: BlurbSection,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof BlurbSection>;

export const Default: Story = {
  args: {

  },
};
