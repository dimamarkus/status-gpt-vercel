import Duo from "./Duo";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Duo> = {
  component: Duo,
  tags: ["autodocs"],
  args: {
    // primaryElement: <h1>Primary</h1>,
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Duo>;

const label = <label className="bg-yellow-300">Label</label>;
const value = <a className="link-primary link bg-green-300">Element</a>;
const innards: [React.ReactNode, React.ReactNode] = [label, value];

export const Default: Story = {
  args: {},
  render: (args) => <Duo {...args}>{innards}</Duo>,
};
