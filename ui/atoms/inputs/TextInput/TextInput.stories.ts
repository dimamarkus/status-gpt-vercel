import Input from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Label",
    name: "my-input",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Bare: Story = {
  args: {
    label: undefined,
  },
};

export const Default: Story = {};

export const Decorated: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    hint: "I'm a hint",
    topRight: "I can even be a link",
  },
};

export const SingleError: Story = {
  args: {
    placeholder: "Placeholder",
    errors: ["Something went wrong"],
  },
};

export const MultiError: Story = {
  args: {
    placeholder: "Placeholder",
    hint: "I'm a hint",
    errors: ["Something went wrong", "Something else went wrong"],
  },
};
