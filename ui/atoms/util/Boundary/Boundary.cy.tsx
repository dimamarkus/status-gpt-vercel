import React from "react";
import Boundary from "./Boundary";

describe("<Boundary />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Boundary>
        <h1>Child</h1>
      </Boundary>,
    );
    cy.get("[class^=Boundary_]").should("exist");
  });
});
