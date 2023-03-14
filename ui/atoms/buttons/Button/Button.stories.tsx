import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  args: {
    text: "Click Me",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {},
};

export const Submit: Story = {
  args: {
    type: "submit",
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    type: "tertiary",
  },
};
