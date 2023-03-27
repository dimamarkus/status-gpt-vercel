import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import ChatSpeakButton from "./ChatSpeakButton";

describe("<ChatSpeakButton />", () => {
  const speechContext = useSpeechSynthesis();

  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatSpeakButton text="Hi. im speaking" {...speechContext} />);
    cy.get("[class^=ChatSpeakButton_]").should("exist");
  });
});
