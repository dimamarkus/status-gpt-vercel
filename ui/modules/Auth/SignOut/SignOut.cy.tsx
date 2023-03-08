import React from 'react';
import SignOut from './SignOut';

describe('<SignOut />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SignOut />);
    cy.get('[class^=SignOut_]').should('exist');
  });
});
