import type { Meta, StoryObj } from "@storybook/react";

import ParsedMarkdown2 from "./ParsedMarkdown";

const meta: Meta<typeof ParsedMarkdown2> = {
  component: ParsedMarkdown2,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ParsedMarkdown2>;

export const Default: Story = {
  args: {},
};
