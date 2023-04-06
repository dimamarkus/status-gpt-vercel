import React from "react";
import FooterSection from "./FooterSection";

describe("<FooterSection />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <FooterSection
        heading={null}
        subheading={null}
        description={null}
        id={0}
        __component={"sections.footer-section"}
        primary_links={[]}
        secondary_links={[]}
      />,
    );
    cy.get("[class^=FooterSection_]").should("exist");
  });
});
