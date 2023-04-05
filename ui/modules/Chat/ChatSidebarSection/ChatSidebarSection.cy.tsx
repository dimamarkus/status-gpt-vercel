import React from "react";
import ChatSidebarSection from "./ChatSidebarSection";

describe("<ChatSidebarSection />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ChatSidebarSection title={"My section"} section={"suggestions"}>
        <h1>this is my section</h1>
      </ChatSidebarSection>,
    );
    cy.get("[class^=ChatSidebarSection_]").should("exist");
  });
});
