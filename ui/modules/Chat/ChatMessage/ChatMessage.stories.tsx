import ChatMessage from "./ChatMessage";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChatMessage> = {
  component: ChatMessage,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

export const Default: Story = {
  args: {},
};
