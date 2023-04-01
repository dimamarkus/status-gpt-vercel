import React from "react";
import CodeBlock from "./CodeBlock";

describe("<CodeBlock />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CodeBlock language={"en"} value={"some text"} />);
    cy.get("[class^=CodeBlock_]").should("exist");
  });
});
