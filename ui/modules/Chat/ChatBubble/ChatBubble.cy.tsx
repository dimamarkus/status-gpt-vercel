import ChatBubble from "./ChatBubble";
import { EXAMPLE_CHAT_MESSAGE } from "#/lib/fixtures/auth-fixtures";

describe("<ChatBubble />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatBubble message={EXAMPLE_CHAT_MESSAGE} />);
    cy.get("[class^=ChatBubble_]").should("exist");
  });
});
