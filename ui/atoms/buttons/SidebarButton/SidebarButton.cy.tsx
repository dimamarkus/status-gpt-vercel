import { SidebarButton } from "#/ui/atoms/buttons/SidebarButton/SidebarButton";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

describe("<SidebarButton />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <SidebarButton
        text={"Hello"}
        icon={<PlusCircleIcon />}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
    cy.get("[class^=SidebarButton_]").should("exist");
  });
});
