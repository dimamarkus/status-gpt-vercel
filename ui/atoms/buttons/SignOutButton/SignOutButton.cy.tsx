import React from 'react';
import SignOutButton from './SignOutButton';

describe('<SignOutButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SignOutButton />);
    cy.get('[class^=SignOutButton_]').should('exist');
  });
});
