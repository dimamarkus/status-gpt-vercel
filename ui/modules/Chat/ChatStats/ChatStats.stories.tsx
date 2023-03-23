import type { Meta, StoryObj } from "@storybook/react";

import ChatStats from "./ChatStats";

const meta: Meta<typeof ChatStats> = {
  component: ChatStats,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatStats>;

export const Default: Story = {
  args: {},
};
