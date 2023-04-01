import React from 'react';
import Overlay from './Overlay';

describe('<Overlay />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Overlay />);
    cy.get('[class^=Overlay_]').should('exist');
  });
});
