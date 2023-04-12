import type { Meta, StoryObj } from "@storybook/react";

import BaseLink from "./BaseLink";

const meta: Meta<typeof BaseLink> = {
  component: BaseLink,
  tags: ["autodocs"],
  args: {
    href: "#",
    text: "Click Me",
  },
};

export default meta;
type Story = StoryObj<typeof BaseLink>;

export const Default: Story = {
  args: {},
};

export const Underlined: Story = {
  args: {
    underlined: true,
  },
};
