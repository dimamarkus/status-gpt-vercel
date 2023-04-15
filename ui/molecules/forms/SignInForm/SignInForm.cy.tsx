import SignInForm from "./SignInForm";

describe("<SignInForm />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SignInForm />);
    cy.get("[class^=SignInForm_]").should("exist");
  });
});
