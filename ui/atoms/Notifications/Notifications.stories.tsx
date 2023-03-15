import Notifications from "./Notifications";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Notifications> = {
  component: Notifications,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof Notifications>;

export const Default: Story = {
  args: {},
};
