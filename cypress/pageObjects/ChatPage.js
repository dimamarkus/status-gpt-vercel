// chatPage.js
// Description: Contains the ChatPage class representing the chat page  with locators and objects.
// Author: Iliya Vereshchagin
// Date: 20.04.2023

import GlobalHeader from "./components/globalHeader";
import Sidebar from "./components/chatSidebar";
import Chat from "./components/chat";

class ChatPage {
  self = 'head title:contains("Brainaics")';
  url = "/chat";

  // Initialize components
  constructor() {
    this.header = new GlobalHeader();
    this.sidebar = new Sidebar();
    this.chat = new Chat();
  }

  // Container getter
  get container() {
    return cy.get(this.self);
  }

  // Check if current URL matches the given parameter (botUID)
  isUrlMatching(botUID) {
    return cy.url().then((url) => url.includes(this.url + "/" + botUID));
  }

  // Visit the chat page
  visit() {
    cy.visit(this.url);
  }
}

export default ChatPage;
