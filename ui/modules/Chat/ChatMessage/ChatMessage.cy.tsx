import ChatMessage from "./ChatMessage";
import { EXAMPLE_CHAT_MESSAGE } from "#/lib/fixtures/auth-fixtures";

describe("<ChatMessage />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatMessage message={EXAMPLE_CHAT_MESSAGE} />);
    cy.get("[class^=ChatMessage_]").should("exist");
  });
});
