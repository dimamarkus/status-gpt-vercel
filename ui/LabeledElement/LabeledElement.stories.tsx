import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";

import LabeledElement from "./LabeledElement";

const meta: Meta<typeof LabeledElement> = {
  component: LabeledElement,
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof LabeledElement>;

const label = <h1>Label</h1>;
const value = <a className="link-primary link">Element</a>;
const innards: [React.ReactNode, React.ReactNode] = [label, value];

export const Default: Story = {
  args: {},
  render: (args) => <LabeledElement {...args}>{innards}</LabeledElement>,
};
