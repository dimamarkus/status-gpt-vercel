import ChatMessages from "./ChatMessages";
import ChatMessage from "#/ui/modules/Chat/ChatMessage/ChatMessage";
import { EXAMPLE_CHAT_MESSAGE } from "#/app/chat/lib/constants";

describe("<ChatMessages />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatMessage {...EXAMPLE_CHAT_MESSAGE} />);
    cy.get("[class^=ChatMessages_]").should("exist");
  });
});
