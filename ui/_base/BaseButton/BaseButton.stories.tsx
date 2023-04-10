import Card from "#/ui/atoms/containers/Card/Card";
import Avatar from "#/ui/atoms/decorations/Avatar/Avatar";
import SpeakerWaveIcon from "@heroicons/react/20/solid/SpeakerWaveIcon";
import type { Meta, StoryObj } from "@storybook/react";

import BaseButton, { BaseButtonProps } from "./BaseButton";

const meta: Meta<typeof BaseButton> = {
  component: BaseButton,
  tags: ["autodocs"],
  args: {
    text: "Click Me",
    className: "",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

export const Default: Story = {
  args: {},
};

export const AllFlavors: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <ButtonPreview label="Default" {...args} />
      <ButtonPreview label="WithIcon" {...args} icon={<SpeakerWaveIcon />} />
      <ButtonPreview label="WithIcon" {...args} icon={<SpeakerWaveIcon />} text={undefined} />
      <ButtonPreview label="Hollow" {...args} flavor="hollow" />
      <ButtonPreview label="Link" {...args} flavor="textOnly" />
      <ButtonPreview
        label="Icon"
        {...args}
        flavor="bare"
        icon={<SpeakerWaveIcon />}
        text={undefined}
      />
      <ButtonPreview label="Bare" {...args} flavor="bare" />
      <ButtonPreview label="Wrapper" {...args} flavor="bare" text={undefined}>
        <Avatar />
      </ButtonPreview>
      <ButtonPreview label="Wrapper w Bg" {...args} flavor="solid" text={undefined}>
        <Avatar />
      </ButtonPreview>
      <div className="btn-danger link-danger btn-outline btn-primary btn-success btn-warning link-success link-warning hidden" />
    </div>
  ),
};

const ButtonPreview = (props: BaseButtonProps & { label: string }) => {
  const { label, ...buttonProps } = props;
  return (
    <Card title={label} description={props.flavor}>
      <BaseButton {...buttonProps} />
    </Card>
  );
};
