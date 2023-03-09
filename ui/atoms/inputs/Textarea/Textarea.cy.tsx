import Textarea from "./Textarea";

describe("<Textarea />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Textarea id="text-textarea" name="text-textarea" label="Test Textarea" />);
    cy.get("[class^=Textarea_]").should("exist");
  });
});
