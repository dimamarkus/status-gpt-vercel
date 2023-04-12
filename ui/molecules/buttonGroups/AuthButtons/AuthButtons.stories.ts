import type { Meta, StoryObj } from "@storybook/react";
import AuthButtons from "./AuthButtons";

const meta: Meta<typeof AuthButtons> = {
  // @ts-expect-error Server Component
  component: AuthButtons,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AuthButtons>;

export const Default: Story = {
  args: {},
};
export const LoggedIn: Story = {
  args: {},
};
