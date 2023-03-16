import ChatMessageStreamed from "./ChatMessageStreamed";
import { EXAMPLE_CHAT_MESSAGE } from "#/lib/fixtures/auth-fixtures";

describe("<ChatMessageStreamed />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatMessageStreamed message={EXAMPLE_CHAT_MESSAGE} />);
    cy.get("[class^=ChatMessageStreamed_]").should("exist");
  });
});
