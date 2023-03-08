import React from 'react';
import SignIn from './SignIn';

describe('<SignIn />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SignIn />);
    cy.get('[class^=SignIn_]').should('exist');
  });
});
