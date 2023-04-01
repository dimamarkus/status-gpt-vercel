import React from 'react';
import ChatHeader from './ChatHeader';

describe('<ChatHeader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatHeader />);
    cy.get('[class^=ChatHeader_]').should('exist');
  });
});
