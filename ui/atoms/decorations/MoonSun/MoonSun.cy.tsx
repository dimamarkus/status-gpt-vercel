import React from 'react';
import MoonSun from './MoonSun';

describe('<MoonSun />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MoonSun />);
    cy.get('[class^=MoonSun_]').should('exist');
  });
});
