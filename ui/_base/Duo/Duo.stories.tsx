import Duo from "./Duo";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Duo> = {
  component: Duo,
  tags: ["autodocs"],
  args: {
    primaryElement: <h1>Primary</h1>,
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Duo>;

export const Default: Story = {
  args: {},
};

export const TwoElements: Story = {
  args: {
    secondaryElement: <h1>Secondary</h1>,
  },
};

export const ThreeElements: Story = {
  args: {
    secondaryElement: <h1>Secondary</h1>,
    tertiaryElement: <h1>Tertiary</h1>,
  },
};

export const ThreeElementsReverse: Story = {
  args: {
    secondaryElement: <h1>Secondary</h1>,
    tertiaryElement: <h1>Tertiary</h1>,
    reverseOrder: true,
  },
};
