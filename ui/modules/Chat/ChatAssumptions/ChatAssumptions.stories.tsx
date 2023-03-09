import type { Meta, StoryObj } from "@storybook/react";

import ChatAssumptions from "./ChatAssumptions";

const meta: Meta<typeof ChatAssumptions> = {
  component: ChatAssumptions,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatAssumptions>;

export const Default: Story = {
  args: {},
};
