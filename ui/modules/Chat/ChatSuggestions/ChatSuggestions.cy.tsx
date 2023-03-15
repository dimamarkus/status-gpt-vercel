import { noop } from "cypress/types/lodash";
import ChatSuggestions from "./ChatSuggestions";

describe("<ChatSuggestions />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatSuggestions />);
    cy.get("[class^=ChatSuggestions_]").should("exist");
  });
});
