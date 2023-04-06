import React from "react";
import HeroSection from "./HeroSection";

describe("<HeroSection />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <HeroSection
        id={0}
        heading={""}
        subheading={""}
        description={""}
        cta={{
          text: "",
          url: "",
          theme: "primary",
        }}
        __component={"sections.hero-section"}
      />,
    );
    cy.get("[class^=HeroSection_]").should("exist");
  });
});
