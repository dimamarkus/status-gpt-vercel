import type { Meta, StoryObj } from '@storybook/react';

import Link from './Link';

const meta: Meta<typeof Link> = {
  component: Link,
  tags: ['autodocs'],
  args: {
    href: '#',
    text: 'Click Me',
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {},
};

export const Underlined: Story = {
  args: {
    underlined: true,
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
  },
};

export const Accent: Story = {
  args: {
    type: 'accent',
  },
};
