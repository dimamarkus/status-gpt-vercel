import type { Meta, StoryObj } from '@storybook/react';

import Footer from './Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {

  },
};
