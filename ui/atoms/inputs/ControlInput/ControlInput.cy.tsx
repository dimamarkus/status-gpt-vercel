import React from "react";
import ControlInput from "./ControlInput";

describe("<ControlInput />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ControlInput name="My Control Input" min={0} max={1000} />);
    cy.get("[class^=ControlInput_]").should("exist");
  });
});
