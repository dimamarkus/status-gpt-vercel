import type { Meta, StoryObj } from '@storybook/react';

import CodeBlock from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  args: {

  },
};
