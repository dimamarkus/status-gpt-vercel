import React from 'react';
import BaseButtonGroup from './BaseButtonGroup';

describe('<BaseButtonGroup />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BaseButtonGroup />);
    cy.get('[class^=BaseButtonGroup_]').should('exist');
  });
});
