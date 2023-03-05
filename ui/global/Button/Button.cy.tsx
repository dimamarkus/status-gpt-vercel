import React from 'react';
import { Button } from './Button';

describe('<Button />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button label={'Button'} primary />);
    cy.get('button').should('exist');
    cy.get('button').should('have.class', 'storybook-button--primary');
    cy.get('button').should('have.text', 'Button');
    cy.get('button').should('have.attr', 'type', 'button');
    // cy.get('button').should('have.attr', 'aria-label', 'Button');
    // cy.get('button').should('have.attr', 'aria-disabled', 'false');
    // cy.get('button').should('not.have.attr', 'disabled');
    // cy.get('button').should('not.have.attr', 'aria-busy');
  });
});
