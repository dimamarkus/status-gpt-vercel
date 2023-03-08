import React from 'react';
import SignUpForm from './SignUpForm';

describe('<SignUpForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SignUpForm />);
    cy.get('[class^=SignUpForm_]').should('exist');
  });
});
