import type { Meta, StoryObj } from "@storybook/react";

import ChatSuggestions from "./ChatSuggestions";

const meta: Meta<typeof ChatSuggestions> = {
  component: ChatSuggestions,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatSuggestions>;

export const Default: Story = {
  args: {},
};
