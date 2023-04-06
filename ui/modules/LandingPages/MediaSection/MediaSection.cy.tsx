import React from "react";
import MediaSection from "./MediaSection";
import { StrapiMediaAttribute, StrapiMedia } from "#/lib/types/strapi";

describe("<MediaSection />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <MediaSection
        heading={null}
        subheading={null}
        description={null}
        id={0}
        __component={"sections.media-section"}
        media={
          {
            data: {
              id: "",
              attributes: {
                url: "",
                alternativeText: null,
                width: 0,
                height: 0,
                createdAt: "",
                updatedAt: "",
                publishedAt: "",
                ext: "",
                hash: "",
                mime: "",
                name: "",
                size: 1,
                path: "",
              },
            },
          } as StrapiMediaAttribute<StrapiMedia>
        }
        cta={{
          text: "",
          url: "",
          theme: "primary",
        }}
      />,
    );
    cy.get("[class^=MediaSection_]").should("exist");
  });
});
