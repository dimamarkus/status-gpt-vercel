import Auth from './Auth';

describe('<Auth />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Auth view={null} />);
    cy.get('[class^=Auth_]').should('exist');
  });
});
