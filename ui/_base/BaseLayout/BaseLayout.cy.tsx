import BaseLayout from './BaseLayout';

describe('<BaseLayout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BaseLayout />);
    cy.get('[class^=BaseLayout_]').should('exist');
  });
});
