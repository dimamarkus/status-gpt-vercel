import TextInput from '#/ui/global/inputs/TextInput/TextInput';

describe('<TextInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TextInput name="email" type="email" />);
    cy.get('[class^=TextInput_]').should('exist');

    cy.get('[class^=TextInput_] input')
      .should('have.value', '')
      .should('have.attr', 'name', 'email')
      .should('have.attr', 'type', 'email')
      .type('email');
  });
});
