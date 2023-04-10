import BaseButtonGroup from "./BaseButtonGroup";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BaseButtonGroup> = {
  component: BaseButtonGroup,
  tags: ["autodocs"],
  args: {
    primaryButton: <BaseButton text="Primary" onClick={() => {}} />,
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BaseButtonGroup>;

export const Default: Story = {
  args: {},
};

export const TwoButtons: Story = {
  args: {
    secondaryButton: <BaseButton text="Secondary" theme="secondary" />,
  },
};

export const ThreeButtons: Story = {
  args: {
    secondaryButton: <BaseButton text="Secondary" theme="secondary" />,
    tertiaryButton: <BaseButton text="Tertiary" flavor="textOnly" />,
  },
};

export const ThreeButtonsReverse: Story = {
  args: {
    secondaryButton: <BaseButton text="Secondary" theme="secondary" />,
    tertiaryButton: <BaseButton text="Tertiary" flavor="textOnly" />,
    reverseOrder: true,
  },
};

export const FromButtonMap: Story = {
  args: {
    buttonMap: [
      {
        text: "Button 1",
        onClick: () => {},
      },
      {
        text: "Button 2",
        onClick: () => {},
      },
      {
        text: "Button 3",
        onClick: () => {},
      },
    ],
  },
};

export const Combined: Story = {
  args: {
    secondaryButton: <BaseButton text="Secondary" theme="secondary" />,
    tertiaryButton: <BaseButton text="Tertiary" flavor="textOnly" />,
    buttonMap: [
      {
        text: "From map 1",
        onClick: () => {},
      },
      {
        text: "From map 2",
        onClick: () => {},
      },
      {
        text: "From map 3",
        onClick: () => {},
      },
    ],
  },
};
