import React from "react";
import DarkModeToggle from "./DarkModeToggleButton";

describe("<DarkModeToggle />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DarkModeToggle />);
    cy.get("[class^=DarkModeToggle_]").should("exist");
  });
});
