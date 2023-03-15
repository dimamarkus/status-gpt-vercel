import ChatMessages from "./ChatMessages";
import { EXAMPLE_CHAT_MESSAGE } from "#/lib/fixtures/auth-fixtures";
import ChatMessage from "#/ui/modules/Chat/ChatMessage/ChatMessage";

describe("<ChatMessages />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatMessage message={EXAMPLE_CHAT_MESSAGE} />);
    cy.get("[class^=ChatMessages_]").should("exist");
  });
});
