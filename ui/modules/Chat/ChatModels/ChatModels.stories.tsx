import type { Meta, StoryObj } from "@storybook/react";

import ChatModels from "./ChatModels";

const meta: Meta<typeof ChatModels> = {
  component: ChatModels,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatModels>;

export const Default: Story = {
  args: {},
};
