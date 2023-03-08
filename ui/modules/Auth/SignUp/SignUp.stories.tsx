import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import SignUp from './SignUp';

const meta: Meta<typeof SignUp> = {
  component: SignUp,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SignUp>;

export const Default: Story = {
  args: {},
  parameters: {},
};

export const EmptyForm: Story = {
  args: {},
  parameters: {},
};

export const FilledForm: Story = {
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

export const FilledFormMobile: Story = {
  ...FilledForm,
  parameters: {
    viewports: { default: 'mobile' },
  },
};
