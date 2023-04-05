import React from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import ChatRangeInput from "./ChatRangeInput";

describe("<ChatRangeInput />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatRangeInput />);
    cy.get("[class^=ChatRangeInput_]").should("exist");
  });
});
