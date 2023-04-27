import React from "react";
import NewChatButton from "./NewChatButton";

describe("<NewChatButton />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NewChatButton />);
    cy.get("[class^=NewChatButton_]").should("exist");
  });
});
