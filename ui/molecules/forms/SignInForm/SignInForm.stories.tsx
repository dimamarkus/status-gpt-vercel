import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import SignInForm from './SignInForm';

const meta: Meta<typeof SignInForm> = {
  component: SignInForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SignInForm>;

export const Default: Story = {
  args: {},
};

export const Filled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText('Email', {
      selector: 'input',
    });
    await userEvent.type(emailInput, 'example-email@email.com', {
      delay: 100,
    });

    const passwordInput = canvas.getByLabelText('Password', {
      selector: 'input',
    });
    await userEvent.type(passwordInput, 'ExamplePassword', {
      delay: 100,
    });

    const submitButton = canvas.getByRole('submit');
    // await userEvent.click(submitButton);
  },
};
