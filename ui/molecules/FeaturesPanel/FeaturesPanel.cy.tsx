import React from 'react';
import FeaturesPanel from './FeaturesPanel';

describe('<FeaturesPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FeaturesPanel />);
    cy.get('[class^=FeaturesPanel_]').should('exist');
  });
});
