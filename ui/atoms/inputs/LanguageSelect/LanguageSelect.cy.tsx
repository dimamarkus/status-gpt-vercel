import React from "react";
import LanguageSelect from "./LanguageSelect";

describe("<LanguageSelect />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LanguageSelect />);
    cy.get("[class^=LanguageSelect_]").should("exist");
  });
});
