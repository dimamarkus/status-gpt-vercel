import { createChatMessage } from "#/app/chat/lib/helpers/chat-helpers";
import React from "react";
import ChatMessageEdit from "./ChatMessageEdit";

describe("<ChatMessageEdit />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ChatMessageEdit
        message={createChatMessage("user", "heres a question")}
        messageIndex={0}
        setEditModeOff={function (): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
    cy.get("[class^=ChatMessageEdit_]").should("exist");
  });
});
