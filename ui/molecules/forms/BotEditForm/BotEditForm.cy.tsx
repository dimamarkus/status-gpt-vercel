import React from "react";
import BotEditForm from "./BotEditForm";

describe("<BotEditForm />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BotEditForm />);
    cy.get("[class^=BotEditForm_]").should("exist");
  });
});
