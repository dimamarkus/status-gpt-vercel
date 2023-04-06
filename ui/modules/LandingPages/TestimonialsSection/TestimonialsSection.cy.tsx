import React from "react";
import TestimonialsSection from "./TestimonialsSection";

describe("<TestimonialsSection />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <TestimonialsSection
        heading={null}
        subheading={null}
        description={null}
        id={0}
        __component={"sections.testimonials-section"}
        quotes={[]}
      />,
    );
    cy.get("[class^=TestimonialsSection_]").should("exist");
  });
});
