import React from 'react';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoginForm />);
    cy.get('[class^=LoginForm_]').should('exist');
  });
});
