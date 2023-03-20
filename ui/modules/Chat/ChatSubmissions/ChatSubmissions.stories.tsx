import type { Meta, StoryObj } from "@storybook/react";

import ChatSubmissions from "./ChatSubmissions";

const meta: Meta<typeof ChatSubmissions> = {
  component: ChatSubmissions,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatSubmissions>;

export const Default: Story = {
  args: {},
};
