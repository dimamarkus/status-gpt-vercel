import React from 'react';
import ChatSettings from './ChatSettings';

describe('<ChatSettings />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatSettings />);
    cy.get('[class^=ChatSettings_]').should('exist');
  });
});
