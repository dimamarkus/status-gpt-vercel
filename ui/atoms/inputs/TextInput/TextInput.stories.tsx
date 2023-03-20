import Input from "./TextInput";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Label",
    name: "my-input",
    touched: true,
    value: "$1,234.68",
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

export const All: Story = {
  args: {
    placeholder: "Placeholder",
    hint: "I'm a hint",
    errors: ["Something went wrong", "Something else went wrong"],
  },
  render: (args) => (
    <div className="flex flex-row space-x-8">
      <div>
        <Input {...args} size="xs" />
        <Input {...args} size="sm" />
        <Input {...args} size="md" />
        <Input {...args} size="lg" />
        <Input {...args} size="xl" />
      </div>
      <div>
        <Input {...args} size="xs" compact />
        <Input {...args} size="sm" compact />
        <Input {...args} size="md" compact />
        <Input {...args} size="lg" compact />
        <Input {...args} size="xl" compact />
      </div>
    </div>
  ),
};
