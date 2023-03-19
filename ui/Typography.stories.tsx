import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";

const meta: Meta = {
  title: "Typography",
};

export default meta;

export const Default = {
  render: () => (
    <div>
      <h1>h1 - Almost before we knew it, we had left the ground</h1>
      <h2>h2 - Almost before we knew it, we had left the ground</h2>
      <h3>h3 - Almost before we knew it, we had left the ground</h3>
      <h4>h4 - Almost before we knew it, we had left the ground</h4>
      <h5>h5 - Almost before we knew it, we had left the ground</h5>
      <h6>h6 - Almost before we knew it, we had left the ground</h6>
      <p>p - Almost before we knew it, we had left the ground</p>
      <label>label - Almost before we knew it, we had left the ground</label>
      <br />
      <small>small - Almost before we knew it, we had left the ground</small>
    </div>
  ),
};
