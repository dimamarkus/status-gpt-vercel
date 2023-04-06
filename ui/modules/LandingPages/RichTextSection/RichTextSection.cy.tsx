import React from "react";
import RichTextSection from "./RichTextSection";

describe("<RichTextSection />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <RichTextSection
        heading={null}
        subheading={null}
        description={null}
        id={0}
        __component={"sections.rich-text-section"}
        content={""}
      />,
    );
    cy.get("[class^=RichTextSection_]").should("exist");
  });
});
