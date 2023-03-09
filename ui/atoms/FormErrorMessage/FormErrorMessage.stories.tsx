import type { Meta, StoryObj } from "@storybook/react";

import FormErrorMessage from "./FormErrorMessage";

const meta: Meta<typeof FormErrorMessage> = {
  component: FormErrorMessage,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof FormErrorMessage>;

export const Default: Story = {
  args: {},
};
