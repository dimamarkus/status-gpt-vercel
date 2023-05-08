/// <reference types="cypress" />

import ChatPage from "../pageObjects/chatPage";
import RandomString from "../utils/helpers";

describe("Testing Conversations", () => {
  let chatPage = new ChatPage();
  let conversations = chatPage.sidebar.conversations;
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
    conversations.addFolderButton.should("be.visible");
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

  it(`Add conversation`, () => {
    openedConversations();
    conversations.addConversation();
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
    openedConversations();
    conversations.addConversation();
    conversations.zeroState.should("not.exist");
    conversations.clearButton.should("be.visible");
    conversations.clearButton.click();
    conversations.cancelButton.should("be.visible");
    conversations.cancelButton.click();
    conversations.getAllItems().then((conversationItems) => {
      expect(conversationItems.length).to.equal(1);
    });
  });

  it("Clear conversations [submit]", () => {
    openedConversations();
    conversations.addConversation();
    conversations.zeroState.should("not.exist");
    conversations.clearButton.should("be.visible");
    conversations.clearButton.click();
    conversations.confirmButton.should("be.visible");
    conversations.confirmButton.click();
    conversations.addConversationButton.should("be.visible");
    conversations.addFolderButton.should("be.visible");
    conversations.filterInput.should("be.hidden");
    conversations.clearButton.should("not.exist");
    conversations.importButton.should("be.visible");
    conversations.exportButton.should("be.visible");
    conversations.zeroState.should("be.visible");
  });

  it("Rename conversation [cancel]", () => {
    // TODO: make test pass
    openedConversations();
    conversations.addConversation();
    let conversation = conversations.getAllItems()[0];
    conversation.editButton.should("be.visible");
    conversation.editButton.click();
    conversation.editInput.should("be.visible");
    const old_name = conversation.caption.invoke("text");
    const new_name = RandomString();
    conversation.editInput.type(new_name);
    conversation.cancelButton.should("be.visible");
    conversation.cancelButton.click();
    conversation.cancelButton.should("not.exist");
    conversation.editInput.should("not.exist");
    conversation.caption.then((text) => {
      expect(new_text).not.to.equal(text);
      expect(old_text).to.equal(text);
    });
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
