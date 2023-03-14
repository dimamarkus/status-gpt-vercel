import ChatMessages from "./ChatMessages";
import { EXAMPLE_CHAT_MESSAGE } from "#/lib/fixtures/auth-fixtures";

describe("<ChatMessages />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatMessages messages={[EXAMPLE_CHAT_MESSAGE, EXAMPLE_CHAT_MESSAGE]} />);
    cy.get("[class^=ChatMessages_]").should("exist");
  });
});
