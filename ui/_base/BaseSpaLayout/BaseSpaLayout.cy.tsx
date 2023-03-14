import BaseSpaLayout from "./BaseSpaLayout";

describe("<BaseSpaLayout />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BaseSpaLayout />);
    cy.get("[class^=BaseSpaLayout]").should("exist");
  });
});
