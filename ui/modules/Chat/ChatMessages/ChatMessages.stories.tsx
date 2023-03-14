import ChatMessages from "./ChatMessages";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChatMessages> = {
  component: ChatMessages,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatMessages>;

export const Default: Story = {
  args: {},
};
