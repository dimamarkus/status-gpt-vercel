import type { Meta, StoryObj } from "@storybook/react";

import CopyButton from "./CopyButton";

const meta: Meta<typeof CopyButton> = {
  component: CopyButton,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: {},
};
