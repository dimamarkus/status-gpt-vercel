import React from "react";
import Duo from "./Duo";

describe("<Duo />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Duo />);
    cy.get("[class^=Duo_]").should("exist");
  });
});
