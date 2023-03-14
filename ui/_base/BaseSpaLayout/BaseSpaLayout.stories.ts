import BaseSpaLayout from "./BaseSpaLayout";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BaseSpaLayout> = {
  component: BaseSpaLayout,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BaseSpaLayout>;

export const Default: Story = {
  args: {},
};
