import React from "react";
import ChatInputAlt from "./ChatInput";

describe("<ChatInputAlt />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatInputAlt />);
    cy.get("[class^=ChatInputAlt_]").should("exist");
  });
});
