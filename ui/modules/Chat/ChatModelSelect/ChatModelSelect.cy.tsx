import React from "react";
import ChatModelSelect from "./ChatModelSelect";
import { OpenAiModel } from "#/app/chat/lib/types";

describe("<ChatModelSelect />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ChatModelSelect
        selectedModel={"gpt-3.5-turbo"}
        onModelChange={function (model: OpenAiModel): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
    cy.get("[class^=ChatModelSelect_]").should("exist");
  });
});
