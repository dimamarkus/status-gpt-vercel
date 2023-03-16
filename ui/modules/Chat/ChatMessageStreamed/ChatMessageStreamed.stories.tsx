import ChatMessageStreamed from "./ChatMessageStreamed";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChatMessageStreamed> = {
  component: ChatMessageStreamed,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatMessageStreamed>;

export const Default: Story = {
  args: {},
};
