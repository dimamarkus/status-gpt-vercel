import React from 'react';
import UpdatePasswordForm from './UpdatePasswordForm';

describe('<UpdatePasswordForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UpdatePasswordForm />);
    cy.get('[class^=UpdatePasswordForm_]').should('exist');
  });
});
