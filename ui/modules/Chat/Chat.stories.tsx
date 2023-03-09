import type { Meta, StoryObj } from "@storybook/react";

import Chat from "./Chat";

const meta: Meta<typeof Chat> = {
  component: Chat,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof Chat>;

export const Default: Story = {
  args: {},
};
