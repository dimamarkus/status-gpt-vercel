import React from "react";
import FormErrorMessage from "./FormErrorMessage";

describe("<FormErrorMessage />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FormErrorMessage />);
    cy.get("[class^=FormErrorMessage_]").should("exist");
  });
});
