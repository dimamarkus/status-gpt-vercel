import React from "react";
import Collapsible from "./Collapsible";

describe("<Collapsible />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Collapsible title={"hello"} slug="testing">
        <h1>Hi</h1>
      </Collapsible>,
    );
    cy.get("[class^=Collapsible_]").should("exist");
  });
});
