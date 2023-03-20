import { noop } from "cypress/types/lodash";
import ChatSubmissions from "./ChatSubmissions";

describe("<ChatSubmissions />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatSubmissions />);
    cy.get("[class^=ChatSubmissions_]").should("exist");
  });
});
