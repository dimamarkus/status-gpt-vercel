import React from "react";
import RootComponents from "./RootComponents";

describe("<RootComponents />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RootComponents />);
    cy.get("[class^=RootComponents_]").should("exist");
  });
});
