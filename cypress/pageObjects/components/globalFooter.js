// globalFooter.js
// Description: Contains the GlobalFooter class representing the global footer component with locators and objects.
// Author: Iliya Vereshchagin
// Date: 08.05.2023

class GlobalFooter {
  self = 'footer[class*="text-xs"]';

  get container() {
    return cy.get(this.self);
  }

  // Link in footer
  get link() {
    return cy.get(`${this.self} a`);
  }

  // URL of the link
  getLinkHref() {
    return this.link.invoke("attr", "href");
  }

  // Settings gear button
  get openSettingsButton() {
    return cy.get('button[title="Open Settings"]');
  }

  get closeSettingsButton() {
    return cy.get('button[title="Close Settings"]');
  }

  constructor() {
    this.settings = new SettingsMenu();
  }
}

class SettingsMenu {
  self = "div.absolute.bottom";

  get container() {
    return cy.get(this.self);
  }

  // Any menu item
  menuItem(value) {
    return cy.get(`${this.self} label[for="${value}"]`);
  }

  // Get menu item using it's caption
  getMenuItem(caption) {
    return cy.get(`${this.self} label`).contains("span", caption);
  }

  // Choice is "Debug"
  get enableAssumptions() {
    return this.menuItem("debugMode");
  }

  // Choice is "Assumptions"
  get enableAssumptions() {
    return this.menuItem("enableAssumptions");
  }

  // Choice is "Submissions"
  get enableSubmission() {
    return this.menuItem("enableSubmission");
  }

  // Choice is "Show Tokens"
  get showTokens() {
    return this.menuItem("showTokens");
  }

  // Choice is "Show User Avatar"
  get showUserAvatar() {
    return this.menuItem("showUserAvatar");
  }

  // Choice is "Show Bot Avatar"
  get showBotAvatar() {
    return this.menuItem("showBotAvatar");
  }
}
export default GlobalFooter;
