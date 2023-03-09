import type { Meta, StoryObj } from '@storybook/react';

import ResizablePanel from './ResizablePanel';

const meta: Meta<typeof ResizablePanel> = {
  component: ResizablePanel,
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ResizablePanel>;

export const Default: Story = {
  args: {},
};
