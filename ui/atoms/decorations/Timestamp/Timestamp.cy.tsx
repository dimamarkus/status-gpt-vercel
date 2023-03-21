import React from 'react';
import Timestamp from './Timestamp';

describe('<Timestamp />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Timestamp />);
    cy.get('[class^=Timestamp_]').should('exist');
  });
});
