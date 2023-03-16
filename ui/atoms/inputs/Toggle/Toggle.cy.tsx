import React from "react";
import Toggle from "./Toggle";

describe("<Toggle />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Toggle />);
    cy.get("[class^=Toggle_]").should("exist");
  });
});
