import React from "react";
import Textarea from "./Textarea";

describe("<Textarea />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Textarea />);
    cy.get("[class^=Textarea_]").should("exist");
  });
});
