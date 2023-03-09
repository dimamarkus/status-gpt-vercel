import type { Meta, StoryObj } from "@storybook/react";

import Textarea from "./Textarea";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {},
};
