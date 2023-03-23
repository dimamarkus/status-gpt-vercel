import type { Meta, StoryObj } from "@storybook/react";

import ChatSpeakButton from "./ChatSpeakButton";

const meta: Meta<typeof ChatSpeakButton> = {
  component: ChatSpeakButton,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatSpeakButton>;

export const Default: Story = {
  args: {},
};
