/// <reference types="cypress" />

import ChatPage from "../pageObjects/chatPage";

describe("Testing Conversations", () => {
  let chatPage = new ChatPage();
  let conversations = chatPage.sidebar.conversations;
  const add_methods = ["button", "icon"];
  function closedConversations() {
    conversations.close();
  }

  function openedConversations() {
    conversations.open();
  }

  it("Default state", () => {
    conversations.container.should("be.visible");
    conversations.menu.should("be.visible");
    conversations.addConversationButton.should("be.visible");
    conversations.addConversationIcon.should("be.visible");
    conversations.filterInput.should("be.hidden");
    conversations.clearButton.should("not.exist");
    conversations.importButton.should("be.visible");
    conversations.exportButton.should("be.visible");
    conversations.zeroState.should("be.visible");

    conversations.getAllItems().then((conversationItems) => {
      expect(conversationItems.length).to.equal(0);
    });
  });

  it("Open conversations", () => {
    closedConversations();
    conversations.open();
    conversations.menu.should("be.visible");
  });

  it("Close conversations ", () => {
    openedConversations();
    conversations.close();
    conversations.menu.should("not.be.visible");
  });

  add_methods.forEach((param) => {
    it(`Add conversation via ${param}`, () => {
      openedConversations();
      conversations.addConversation(param);
      conversations.getAllItems().then((conversation_items) => {
        conversation_items[0].container.should("be.visible");
        conversation_items[0].caption.invoke("text").should("equal", "Untitled conversation");
        conversation_items[0].editButton.should("be.visible");
        conversation_items[0].deleteButton.should("be.visible");
        conversation_items[0].editInput.should("not.exist");
        conversation_items[0].confirmButton.should("not.exist");
        conversation_items[0].cancelButton.should("not.exist");
        conversations.clearButton.should("be.visible");
        conversations.zeroState.should("not.exist");
      });
    });

    it("Clear conversations [cancel]", () => {
      // TODO: 1) rewrite with API 2) make test pass
      openedConversations();
      conversations.addConversation([Math.floor(Math.random() * add_methods.length)]);
      conversations.zeroState.should("not.exist");
      conversations.clearButton.should("be.visible");
      conversations.clearButton.click();
      conversations.getAllItems().then((conversationItems) => {
        expect(conversationItems.length).to.equal(0);
        conversations.zeroState.should("be.visible");
      });
    });
  });

  it("Clear conversations [submit]", () => {
    // TBD
  });

  it("Rename conversation", () => {
    // TBD
  });

  it("Add several conversations", () => {
    // TBD
  });

  it("Conversations filtering", () => {
    // TBD
  });

  it("Delete conversation [cancel]", () => {
    // TBD
  });

  it("Delete conversation [submit]", () => {
    // TBD
  });

  it("Delete conversation [cancel]", () => {
    // TBD
  });

  it("Import conversations", () => {
    // TBD
  });

  it("Export conversations", () => {
    // TBD
  });
});
