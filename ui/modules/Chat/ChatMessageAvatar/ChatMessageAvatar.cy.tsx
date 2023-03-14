import React from "react";
import ChatMessageAvatar from "./ChatMessageAvatar";

describe("<ChatMessageAvatar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatMessageAvatar />);
    cy.get("[class^=ChatMessageAvatar_]").should("exist");
  });
});
