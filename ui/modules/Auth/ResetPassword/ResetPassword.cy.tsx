import ResetPassword from './ResetPassword';

describe('<ResetPassword />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ResetPassword />);
    cy.get('[class^=ResetPassword_]').should('exist');
  });
});
