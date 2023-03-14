import React from "react";
import ChatMessageBubble from "./ChatMessageBubble";

describe("<ChatMessageBubble />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatMessageBubble />);
    cy.get("[class^=ChatMessageBubble_]").should("exist");
  });
});
