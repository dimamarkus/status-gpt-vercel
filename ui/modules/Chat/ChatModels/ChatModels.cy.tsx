import React from "react";
import ChatModels from "./ChatModels";

describe("<ChatModels />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatModels />);
    cy.get("[class^=ChatModels_]").should("exist");
  });
});
