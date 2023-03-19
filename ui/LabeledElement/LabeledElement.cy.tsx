import React from "react";
import LabeledElement from "./LabeledElement";

describe("<LabeledElement />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LabeledElement />);
    cy.get("[class^=LabeledElement_]").should("exist");
  });
});
