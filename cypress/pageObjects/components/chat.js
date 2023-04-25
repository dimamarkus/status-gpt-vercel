// chat.js
// Description: Contains the Срфе class representing the Срфе component with locators and objects.
// Author: Iliya Vereshchagin
// Date: 20.04.2023

class ChatTopBar {
  self = "header";

  get container() {
    return cy.get(this.self);
  }

  get expandButton() {
    return cy.get(`${this.self} button:not([title])`);
  }

  get startNewConversationButton() {
    return cy.get(`${this.self} button[title="Start new conversation"]`);
  }

  get enterFullScreenButton() {
    return cy.get(`${this.self} button[title="Enter Full-screen"]`);
  }

  get clearAllMessagesButton() {
    return cy.get(`${this.self} button[title="Clear all messages"]`);
  }

  get labelText() {
    return cy.get(`${this.self} h3`);
  }
}

class ChatMessage {
  self = "li.ChatMessage_root";

  get container() {
    return cy.get(this.self);
  }

  get avatar() {
    return cy.get(`${this.self} img[alt="avatar"]`);
  }

  getAvatarUrl() {
    return this.avatar.invoke("attr", "src");
  }

  get timestamp() {
    return cy.get(`${this.self} time`);
  }

  get message() {
    return cy.get(`${this.self} div.parsedMarkdown`);
  }

  get speakButton() {
    return cy.get(`${this.self} button[title="Speak the message out loud"]`);
  }

  get editButton() {
    return cy.get(`${this.self} button:contains("Edit")`);
  }

  get copyButton() {
    return cy.get(`${this.self} button:contains("Copy")`);
  }

  get regenerateButton() {
    return cy.get(`${this.self} button[title="Regenerate response"]`);
  }

  get codeblock() {
    return cy.get(`${this.self} div.codeblock`);
  }

  get codeblockContent() {
    return cy.get(`${this.self} div.codeblock pre`);
  }

  get codeblockLanguage() {
    return cy.get(`${this.self} div.codeblock span`);
  }

  get codeblockCopyButton() {
    return cy.get(`${this.self} div.codeblock button:contains("Copy code")`);
  }

  get codeblockDownloadButton() {
    return cy.get(`${this.self} div.codeblock button:not(:contains("Copy code"))`);
  }
}

class Chat {
  // Methods for Chat
  self = "ul.ChatMessages_root";
  topBar = new ChatTopBar();

  get container() {
    return cy.get(this.self);
  }

  get chatInput() {
    return cy.get(`${this.self} textarea#chatInput`);
  }

  get sendButton() {
    return cy.get(`${this.self} button[title="Send your chat message"]`);
  }

  get cancelButton() {
    return cy.get(`${this.self} button[title="Cancel your message and reset"]`);
  }

  get holdToSpeakButton() {
    return cy.get(`${this.self} button[title="Hold to speak"]`);
  }

  constructor() {
    this.topBar.self = `${this.self} ${this.topBar.self}`;
  }

  get responseLengthSlider() {
    return cy.get(`${this.self} input#responseLength`);
  }

  get responseLengthCaption() {
    return cy.get(`${this.self} div.text-xs.font-medium.text-primary`);
  }

  setResponseLength(position) {
    const captions = {
      1: "Short and sweet",
      2: "Balanced",
      3: "Detailed",
    };

    this.responseLengthSlider.invoke("val", position).trigger("input");
    return this.responseLengthCaption.should("contain.text", captions[position]);
  }

  getResponseLength() {
    return this.responseLengthSlider.invoke("val");
  }

  sendMessage(userText) {
    this.chatInput.type(userText);
    this.sendButton.click();
  }
}

export default Chat;
