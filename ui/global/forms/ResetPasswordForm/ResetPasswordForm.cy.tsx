import React from 'react';
import ResetPasswordForm from './ResetPasswordForm';

describe('<ResetPasswordForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ResetPasswordForm />);
    cy.get('[class^=ResetPasswordForm_]').should('exist');
  });
});
