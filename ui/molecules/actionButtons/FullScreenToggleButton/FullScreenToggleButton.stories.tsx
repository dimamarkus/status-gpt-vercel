import type { Meta, StoryObj } from "@storybook/react";

import FullScreenToggleButton from "./FullScreenToggleButton";

const meta: Meta<typeof FullScreenToggleButton> = {
  component: FullScreenToggleButton,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof FullScreenToggleButton>;

export const Default: Story = {
  args: {},
};
