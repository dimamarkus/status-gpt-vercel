import AuthButtons from './AuthButtons';

describe('<AuthButtons />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AuthButtons />);
    cy.get('[class^=AuthButtons_]').should('exist');
  });
});
