import type { Meta, StoryObj } from '@storybook/react';

import FeaturesPanel from './FeaturesPanel';

const meta: Meta<typeof FeaturesPanel> = {
  component: FeaturesPanel,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FeaturesPanel>;

export const Default: Story = {
  args: {},
};
