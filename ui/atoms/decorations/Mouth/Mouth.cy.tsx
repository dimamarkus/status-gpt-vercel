import React from "react";
import Mouth from "./Mouth";

describe("<Mouth />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Mouth />);
    cy.get("[class^=Mouth_]").should("exist");
  });
});
