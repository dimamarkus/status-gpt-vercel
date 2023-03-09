import React from "react";
import ChatAssumptions from "./ChatAssumptions";

describe("<ChatAssumptions />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatAssumptions />);
    cy.get("[class^=ChatAssumptions_]").should("exist");
  });
});
