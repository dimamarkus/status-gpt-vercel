import React from "react";
import ChatBots from "./ChatBots";

describe("<ChatBots />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatBots bots={[]} />);
    cy.get("[class^=ChatBots_]").should("exist");
  });
});
