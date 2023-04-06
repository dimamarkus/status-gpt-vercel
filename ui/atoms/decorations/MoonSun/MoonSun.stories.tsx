import type { Meta, StoryObj } from '@storybook/react';

import MoonSun from './MoonSun';

const meta: Meta<typeof MoonSun> = {
  component: MoonSun,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof MoonSun>;

export const Default: Story = {
  args: {

  },
};
