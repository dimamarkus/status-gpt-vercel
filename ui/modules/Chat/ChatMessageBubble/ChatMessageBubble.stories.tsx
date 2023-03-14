import type { Meta, StoryObj } from "@storybook/react";

import ChatMessageBubble from "./ChatMessageBubble";

const meta: Meta<typeof ChatMessageBubble> = {
  component: ChatMessageBubble,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatMessageBubble>;

export const Default: Story = {
  args: {},
};
