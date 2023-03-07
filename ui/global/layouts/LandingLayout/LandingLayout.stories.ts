import type {Meta, StoryObj} from '@storybook/react';

import LandingLayout from './LandingLayout';

const meta: Meta<typeof LandingLayout> = {
  component: LandingLayout,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingLayout>;

export const Default: Story = {
  args: {

  },
};
