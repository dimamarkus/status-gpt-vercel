import React from "react";
import FullScreenToggleButton from "./FullScreenToggleButton";

describe("<FullScreenToggleButton />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FullScreenToggleButton />);
    cy.get("[class^=FullScreenToggleButton_]").should("exist");
  });
});
