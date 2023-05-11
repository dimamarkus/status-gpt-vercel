// globalHeader.js
// Description: Contains the GlobalHeader class representing the global header component with locators and objects.
// Author: Iliya Vereshchagin
// Date: 20.04.2023

class GlobalHeader {
  self = "header.navbar";

  // Menu button locator
  get menuButton() {
    return cy.get(`${this.self} .dropdown`);
  }

  // Logo locator
  get logo() {
    return cy.get(`${this.self} .logo`);
  }

  // Theme toggle button locator
  get themeToggleButton() {
    return cy.get(`${this.self} button[title="Toggle dark mode"]`);
  }

  get newChatButton() {
    return cy.get(`${this.self} button`).contains("New Chat");
  }

  // Hints for the links
  newChat = "Start a new conversation";
}

export default GlobalHeader;
