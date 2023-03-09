import type { Meta, StoryObj } from "@storybook/react";

import RootComponents from "./RootComponents";

const meta: Meta<typeof RootComponents> = {
  component: RootComponents,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof RootComponents>;

export const Default: Story = {
  args: {},
};
