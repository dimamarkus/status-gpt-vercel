import type { Meta, StoryObj } from "@storybook/react";

import TextField from "./TextField";

const meta: Meta<typeof TextField> = {
  component: TextField,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {},
};
