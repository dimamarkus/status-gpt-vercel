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

  // About link locator
  get aboutLink() {
    return cy.get(`${this.self} a:contains("About")`);
  }

  // Create link locator
  get createLink() {
    return cy.get(`${this.self} a:contains("Create")`);
  }

  // Sign In link locator
  get signInLink() {
    return cy.get(`${this.self} a:contains("Sign In")`);
  }

  // Sign Up link locator
  get signUpLink() {
    return cy.get(`${this.self} a:contains("Sign Up")`);
  }

  // Theme toggle button locator
  get themeToggleButton() {
    return cy.get(`${this.self} button[title="Toggle dark mode"]`);
  }

  // Hints for the links
  aboutLinkHint = "Learn about Status Money's work with AI";
  createLinkHint = "Learn about Status Money's work with AI";
  signInLinkHint = "Sign in to your Status Money account.";
  signUpLinkHint = "Sign up and create your own bots";
}

export default GlobalHeader;
