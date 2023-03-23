import { EXAMPLE_CHAT_MESSAGE } from "#/app/chat/lib/constants";
import ChatMessage from "./ChatMessage";

describe("<ChatMessage />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatMessage {...EXAMPLE_CHAT_MESSAGE} />);
    cy.get("[class^=ChatMessage_]").should("exist");
  });
});
