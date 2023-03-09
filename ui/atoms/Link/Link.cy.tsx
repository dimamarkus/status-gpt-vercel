import Link from './Link';

describe('<Link />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Link href={''} />);
    cy.get('[class^=Link_]').should('exist');
  });
});
