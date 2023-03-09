import React from 'react';
import Card from './Card';

describe('<Card />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Card />);
    cy.get('[class^=Card_]').should('exist');
  });
});
