import type { Meta, StoryObj } from '@storybook/react';

import HeroSection from './HeroSection';

const meta: Meta<typeof HeroSection> = {
  component: HeroSection,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {

  },
};
