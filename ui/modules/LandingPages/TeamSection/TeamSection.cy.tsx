import React from "react";
import TeamSection from "./TeamSection";

describe("<TeamSection />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <TeamSection
        heading={null}
        subheading={null}
        description={null}
        id={0}
        __component={"sections.team-section"}
        avatars={[]}
      />,
    );
    cy.get("[class^=TeamSection_]").should("exist");
  });
});
