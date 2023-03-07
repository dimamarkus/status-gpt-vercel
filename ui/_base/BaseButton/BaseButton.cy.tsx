import BaseButton from './BaseButton';

describe('<BaseButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BaseButton text="Testing" />);
    cy.get('[class^=BaseButton_]')
      .should('exist')
      .should('have.text', 'Testing')
      .should('have.class', 'btn-primary');
  });
});
