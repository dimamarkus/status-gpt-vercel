import type { Meta, StoryObj } from "@storybook/react";

import ChatWindow from "./ChatWindow";

const meta: Meta<typeof ChatWindow> = {
  component: ChatWindow,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatWindow>;

export const Default: Story = {
  args: {},
};
