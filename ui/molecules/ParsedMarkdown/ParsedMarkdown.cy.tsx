import React from "react";
import ParsedMarkdown from "./ParsedMarkdown";

describe("<ParsedMarkdown />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ParsedMarkdown content={"# im a headeing"} />);
    cy.get("[class^=ParsedMarkdown_]").should("exist");
  });
});
