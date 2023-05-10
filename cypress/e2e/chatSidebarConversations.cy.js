/// <reference types="cypress" />

import ChatPage from "../pageObjects/chatPage";
import randomString from "../utils/helpers";

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
    conversations.filterInput.should("not.exist");
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
      conversations.container.should("be.visible");
      conversations.menu.should("be.visible");
      conversations.addConversationButton.should("be.visible");
      conversations.addFolderButton.should("be.visible");
      conversations.filterInput.should("not.exist");
      conversations.clearButton.should("be.visible");
      conversations.importButton.should("be.visible");
      conversations.exportButton.should("be.visible");
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
    conversations.filterInput.should("not.exist");
    conversations.clearButton.should("not.exist");
    conversations.importButton.should("be.visible");
    conversations.exportButton.should("be.visible");
    conversations.zeroState.should("be.visible");
  });

  it("Rename conversation [cancel]", () => {
    openedConversations();
    conversations.addConversation();
    conversations.getAllItems().then((conversation_items) => {
      conversation_items[0].caption.invoke("text").then((old_text) => {
        conversation_items[0].editButton.should("be.visible");
        conversation_items[0].editButton.click();
        const new_text = randomString();
        conversation_items[0].editInput.type(new_text);
        conversation_items[0].cancelButton.click();
        conversation_items[0].cancelButton.should("not.exist");
        conversation_items[0].editInput.should("not.exist");
        conversation_items[0].caption.invoke("text").then((updated_text) => {
          expect(new_text).not.to.equal(updated_text);
          expect(old_text).to.equal(updated_text);
        });
      });
    });
  });

  it("Rename conversation [submit]", () => {
    openedConversations();
    conversations.addConversation();
    conversations.getAllItems().then((conversation_items) => {
      conversation_items[0].caption.invoke("text").then((old_text) => {
        const new_text = randomString();
        conversation_items[0].rename(new_text);
        conversation_items[0].caption.invoke("text").then((updated_text) => {
          expect(new_text).to.equal(updated_text);
        });
      });
    });
  });

  it("Add several conversations", () => {
    openedConversations();
    const conversationsCount = Math.floor(Math.random() * 4) + 2;
    for (let i = 0; i < conversationsCount; i++) {
      conversations.addConversation();
    }
    conversations.getAllItems().then((conversationItems) => {
      expect(conversationItems.length).to.equal(conversationsCount);
      conversations.filterInput.should("be.visible");
    });
  });

  const testCases = [
    ["PATTERN", Math.floor(Math.random() * 4) + 2],
    [0, 1],
    [randomString(), 0],
  ];

  Cypress._.each(testCases, ([pattern, expectedCount]) => {
    it.only("Conversations filtering", () => {
      openedConversations();
      let conversationsCount = Math.floor(Math.random() * 4) + 2;
      if (pattern == 0) {
        pattern = `_${Cypress._.random(2, conversationsCount)}`;
      }
      for (let i = 0; i < conversationsCount; i++) {
        conversations.addConversation();
      }
      conversations.getAllItems().then((conversation_items) => {
        conversation_items[0].caption.invoke("text").then((old_text) => {
          for (let i = 0; i < conversationsCount; i++) {
            conversation_items[i].rename(`PATTERN_${i}`);
          }
        });
      });
      conversations.filterInput.clear().type(pattern);
      conversations.getCount().then((conversationsActualCount) => {
        expect(conversationsActualCount).to.equal(expectedCount);
      });
    });
  });

  it("Delete conversation [cancel]", () => {
    openedConversations();
    conversations.addConversation();
    conversations.getAllItems().then((conversation_items) => {
      conversation_items[0].deleteButton.should("be.visible");
      conversation_items[0].deleteButton.click();
      conversation_items[0].cancelButton.should("be.visible");
      conversation_items[0].cancelButton.click();
      conversation_items[0].cancelButton.should("not.exist");
      conversations.getCount().then((conversationsActualCount) => {
        expect(conversationsActualCount).to.equal(1);
      });
    });
  });

  it("Delete conversation [last]", () => {
    openedConversations();
    conversations.addConversation();
    conversations.getAllItems().then((conversation_items) => {
      conversation_items[0].deleteButton.should("be.visible");
      conversation_items[0].deleteButton.click();
      conversation_items[0].confirmButton.should("be.visible");
      conversation_items[0].confirmButton.click();
      conversation_items[0].confirmButton.should("not.exist");
      conversations.zeroState.should("be.visible");
      conversations.getCount().then((conversationsActualCount) => {
        expect(conversationsActualCount).to.equal(0);
      });
    });
  });

  it("Delete conversation [several]", () => {
    openedConversations();
    const conversationsCount = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < conversationsCount; i++) {
      conversations.addConversation();
    }
    for (let i = 0; i < conversationsCount; i++) {
      conversations.getAllItems().then((conversation_items) => {
        let any_index = Cypress._.random(0, Math.floor(Math.random() * (conversationsCount - i)));
        console.log("any_index:", any_index);
        conversation_items[any_index].container.click();
        conversation_items[any_index].deleteButton.should("be.visible");
        conversation_items[any_index].deleteButton.click();
        conversation_items[any_index].confirmButton.should("be.visible");
        conversation_items[any_index].confirmButton.click();
        conversation_items[any_index].confirmButton.should("not.exist");
        conversations.getCount().then((conversationsActualCount) => {
          expect(conversationsActualCount).to.equal(conversationsCount - i - 1);
        });
      });
    }
    conversations.zeroState.should("be.visible");
  });

  it("Import conversations", () => {
    // TBD
  });

  it("Export conversations", () => {
    // TBD
  });
});
