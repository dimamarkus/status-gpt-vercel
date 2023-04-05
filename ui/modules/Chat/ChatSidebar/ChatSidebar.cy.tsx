import React from "react";
import ChatSidebar from "./ChatSidebar";

describe("<ChatSidebar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ChatSidebar
        bots={[]}
        selectedBot={{
          slug: "",
          name: "",
          description: "",
          avatar: undefined,
          is_featured: false,
          welcome_message: null,
          training: "",
          general_training: "",
          json_training: {} as JSON,
          model: "text-davinci-003",
          max_tokens: null,
          temperature: null,
          top_p: null,
          frequency_penalty: null,
          presence_penalty: null,
          voice: undefined,
          memory: 0,
          publishedAt: "",
          createdBy: "",
          chat_style_ids: undefined,
          chat_syntax_ids: undefined,
          chat_intention_ids: undefined,
          chat_user_info_ids: undefined,
          chat_content_ids: undefined,
          promotion_ids: undefined,
          trigger_ids: undefined,
          custom_triggers: undefined,
        }}
      />,
    );
    cy.get("[class^=ChatSidebar_]").should("exist");
  });
});
