import React from "react";
import ParsedMarkdown2 from "./ParsedMarkdown";

describe("<ParsedMarkdown2 />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ParsedMarkdown2 content="hello" />);
    cy.get("[class^=ParsedMarkdown2_]").should("exist");
  });
});
