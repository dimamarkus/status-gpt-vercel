import type { Meta, StoryObj } from '@storybook/react';

import LanguageSelect from './LanguageSelect';

const meta: Meta<typeof LanguageSelect> = {
  component: LanguageSelect,
  tags: ['autodocs'],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof LanguageSelect>;

export const Default: Story = {
  args: {

  },
};
