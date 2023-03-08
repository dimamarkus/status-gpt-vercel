import React from 'react';
import Blocks from './Blocks';

describe('<Blocks />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Blocks />);
    cy.get('[class^=Blocks_]').should('exist');
  });
});
