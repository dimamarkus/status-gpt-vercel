import React from "react";
import Notifications from "./Notifications";

describe("<Notifications />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Notifications />);
    cy.get("[class^=Notifications_]").should("exist");
  });
});
