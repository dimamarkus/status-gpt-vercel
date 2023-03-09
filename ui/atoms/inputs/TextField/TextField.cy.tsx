import React from "react";
import TextField from "./TextField";

describe("<TextField />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TextField />);
    cy.get("[class^=TextField_]").should("exist");
  });
});
