import React from "react";
import KeyValueList from "./KeyValueList";

describe("<KeyValueList />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<KeyValueList items={[{ key: "item 1", value: "value 1" }]} />);
    cy.get("[class^=KeyValueList_]").should("exist");
  });
});
