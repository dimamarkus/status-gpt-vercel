import ChatWindow from "./ChatWindow";
import { EXAMPLE_CHAT_MESSAGE } from "#/lib/fixtures/auth-fixtures";

describe("<ChatWindow />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatWindow chatHistory={[EXAMPLE_CHAT_MESSAGE, EXAMPLE_CHAT_MESSAGE]} />);
    cy.get("[class^=ChatWindow_]").should("exist");
  });
});
