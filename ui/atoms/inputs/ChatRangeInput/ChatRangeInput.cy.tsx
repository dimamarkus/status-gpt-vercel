import React from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import ChatRangeInput from "./ChatRangeInput";

describe("<ChatRangeInput />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatRangeInput name="myRange" currentValue={150} max={300} min={0} />);
    cy.get("[class^=ChatRangeInput_]").should("exist");
  });
});
