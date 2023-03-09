import BaseLink from './BaseLink';

describe('<BaseLink />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BaseLink href={'#'} />);
    cy.get('[class^=BaseLink_]')
      .should('exist')
      .should('have.text', 'Testing')
      .should('have.class', 'btn-primary');
    cy.get('a').should('have.attr', 'href', '#');
  });
});
