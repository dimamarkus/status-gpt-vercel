import Button from "./Button";

describe("<Button />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button text="Testing" />);
    cy.get("button")
      .should("exist")
      .should("have.text", "Testing")
      .should("have.class", "btn-primary");
  });
});
