import type { Meta, StoryObj } from '@storybook/react';

import KeyValueList from './KeyValueList';

const meta: Meta<typeof KeyValueList> = {
  component: KeyValueList,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof KeyValueList>;

export const Default: Story = {
  args: {

  },
};
