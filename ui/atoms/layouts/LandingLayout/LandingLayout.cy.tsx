import React from 'react';
import LandingLayout from './LandingLayout';

describe('<LandingLayout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LandingLayout />);
    cy.get('[class^=LandingLayout_]').should('exist');
  });
});
