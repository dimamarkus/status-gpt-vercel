import React from "react";
import ChatStats from "./ChatStats";

describe("<ChatStats />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatStats />);
    cy.get("[class^=ChatStats_]").should("exist");
  });
});
