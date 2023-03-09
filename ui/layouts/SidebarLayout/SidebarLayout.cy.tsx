import SidebarLayout from './SidebarLayout';

describe('<SidebarLayout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <SidebarLayout>
        <div></div>
      </SidebarLayout>,
    );
    cy.get('[class^=SidebarLayout_]').should('exist');
  });
});
