import ParsedMarkdown from "./ParsedMarkdown";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ParsedMarkdown> = {
  component: ParsedMarkdown,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof ParsedMarkdown>;

export const Default: Story = {
  args: {},
};
