import type { Meta, StoryObj } from '@storybook/react';

import RichTextSection from './RichTextSection';

const meta: Meta<typeof RichTextSection> = {
  component: RichTextSection,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof RichTextSection>;

export const Default: Story = {
  args: {

  },
};
