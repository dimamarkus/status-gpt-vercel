import React from 'react';
import LoadingDots from './LoadingDots';

describe('<LoadingDots />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoadingDots />);
    cy.get('[class^=LoadingDots_]').should('exist');
  });
});
