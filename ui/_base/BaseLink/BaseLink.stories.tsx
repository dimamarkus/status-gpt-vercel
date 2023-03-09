import type { Meta, StoryObj } from '@storybook/react';

import BaseLink from './BaseLink';

const meta: Meta<typeof BaseLink> = {
  component: BaseLink,
  tags: ['autodocs'],
  args: {
    text: 'Click Me',
    href: '#',
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BaseLink>;

export const Default: Story = {
  args: {},
};
