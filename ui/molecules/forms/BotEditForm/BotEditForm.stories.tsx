import type { Meta, StoryObj } from "@storybook/react";

import BotEditForm from "./BotEditForm";

const meta: Meta<typeof BotEditForm> = {
  component: BotEditForm,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BotEditForm>;

export const Default: Story = {
  args: {},
};
