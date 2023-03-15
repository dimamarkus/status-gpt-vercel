import ChatBotMenu from "./ChatBotMenu";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChatBotMenu> = {
  /* @ts-expect-error Async Server Component */
  component: ChatBotMenu,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ChatBotMenu>;

export const Default: Story = {
  args: {},
};
