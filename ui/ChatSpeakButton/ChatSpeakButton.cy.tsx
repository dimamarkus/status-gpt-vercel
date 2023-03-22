import React from "react";
import ChatSpeakButton from "./ChatSpeakButton";

describe("<ChatSpeakButton />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatSpeakButton text={"Hi. im speaking"} />);
    cy.get("[class^=ChatSpeakButton_]").should("exist");
  });
});
