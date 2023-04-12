import BaseLink from "./BaseLink";

describe("<Link />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BaseLink href={""} />);
    cy.get("[class^=Link_]").should("exist");
  });
});
