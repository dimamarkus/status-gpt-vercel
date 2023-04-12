import { Suspense } from "react";
import AuthButtons from "./AuthButtons";
import Spinner from "#/ui/atoms/svgs/Spinner";

describe("<AuthButtons />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Suspense fallback={<Spinner />}>
        {/* @ts-expect-error Server Component */}
        <AuthButtons />
      </Suspense>,
    );
    cy.get("[class^=AuthButtons_]").should("exist");
  });
});
