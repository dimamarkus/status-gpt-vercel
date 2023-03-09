import React from 'react';
import ResizablePanel from './ResizablePanel';

describe('<ResizablePanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ResizablePanel />);
    cy.get('[class^=ResizablePanel_]').should('exist');
  });
});
