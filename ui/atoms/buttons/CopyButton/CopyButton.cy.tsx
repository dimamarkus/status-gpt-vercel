import React from "react";
import CopyButton from "./CopyButton";

describe("<CopyButton />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CopyButton content={"Ive been copy and pasted"} />);
    cy.get("[class^=CopyButton_]").should("exist");
  });
});
