import type { Meta, StoryObj } from "@storybook/react";

import ControlInput from "./ControlInput";

const meta: Meta<typeof ControlInput> = {
  component: ControlInput,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ControlInput>;

export const Default: Story = {
  args: {},
};
