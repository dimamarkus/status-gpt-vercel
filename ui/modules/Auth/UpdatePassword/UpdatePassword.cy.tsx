import React from 'react';
import UpdatePassword from './UpdatePassword';

describe('<UpdatePassword />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UpdatePassword />);
    cy.get('[class^=UpdatePassword_]').should('exist');
  });
});
