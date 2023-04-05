import React from "react";
import ChatLayout from "./ChatLayout";

describe("<ChatLayout />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ChatLayout sidebar={<h2>Im a sidebar</h2>}>
        <h1>This is a test.</h1>
      </ChatLayout>,
    );
    cy.get("[class^=ChatLayout_]").should("exist");
  });
});
