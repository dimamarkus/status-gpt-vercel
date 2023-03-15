import React from "react";
import ChatBotMenu from "./ChatBotMenu";

describe("<ChatBotMenu />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    /* @ts-expect-error Async Server Component */
    cy.mount(<ChatBotMenu />);
    cy.get("[class^=ChatBotMenu_]").should("exist");
  });
});
