import type { Meta, StoryObj } from "@storybook/react";

import ChatLayout from "./ChatLayout";

const meta: Meta<typeof ChatLayout> = {
  component: ChatLayout,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatLayout>;

export const Default: Story = {
  args: {},
};
