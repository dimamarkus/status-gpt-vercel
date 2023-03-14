import ChatMessageAvatar from "./ChatMessageAvatar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChatMessageAvatar> = {
  component: ChatMessageAvatar,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatMessageAvatar>;

export const Default: Story = {
  args: {},
};
