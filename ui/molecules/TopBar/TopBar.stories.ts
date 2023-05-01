import TopBar from "#/ui/molecules/TopBar/TopBar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TopBar> = {
  component: TopBar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  args: {
  },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof TopBar>;

export const Default: Story = {};

export const LoggedIn: Story = {
  args: {},
};
