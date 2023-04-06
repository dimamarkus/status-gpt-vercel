import type { Meta, StoryObj } from '@storybook/react';

import TeamSection from './TeamSection';

const meta: Meta<typeof TeamSection> = {
  component: TeamSection,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof TeamSection>;

export const Default: Story = {
  args: {

  },
};
