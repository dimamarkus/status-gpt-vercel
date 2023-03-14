import type { Meta, StoryObj } from "@storybook/react";

import Mouth from "./Mouth";

const meta: Meta<typeof Mouth> = {
  component: Mouth,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof Mouth>;

export const Default: Story = {
  args: {},
};
