import type { Meta, StoryObj } from '@storybook/react';

import FooterSection from './FooterSection';

const meta: Meta<typeof FooterSection> = {
  component: FooterSection,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof FooterSection>;

export const Default: Story = {
  args: {

  },
};
