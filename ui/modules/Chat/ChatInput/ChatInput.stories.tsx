import type { Meta, StoryObj } from "@storybook/react";

import ChatInputAlt from "./ChatInput";

const meta: Meta<typeof ChatInputAlt> = {
  component: ChatInputAlt,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatInputAlt>;

export const Default: Story = {
  args: {},
};
