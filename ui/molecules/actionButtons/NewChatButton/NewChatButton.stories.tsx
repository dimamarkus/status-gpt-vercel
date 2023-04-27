import type { Meta, StoryObj } from "@storybook/react";

import NewChatButton from "./NewChatButton";

const meta: Meta<typeof NewChatButton> = {
  component: NewChatButton,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof NewChatButton>;

export const Default: Story = {
  args: {},
};
