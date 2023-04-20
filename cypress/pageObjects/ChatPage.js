// Header locators and objects

class Header {
  self = "header.navbar";
  menuButton = `${this.self} .dropdown`;
  logo = `${this.self} .logo`;
  aboutLink = `${this.self} a:contains("About")`;
  aboutLinkHint = "Learn about Status Money's work with AI";
  createLink = `${this.self} a:contains("Create")`;
  createLinkHint = "Learn about Status Money's work with AI";
  signInLink = `${this.self} a:contains("Sign In")`;
  signInLinkHint = "Sign in to your Status Money account.";
  signUpLink = `${this.self} a:contains("Sign Up")`;
  signUpLinkHint = "Sign up and create your own bots";
  themeToggleButton = `${this.self} button[title="Toggle dark mode"]`;
}

// Sidebar locators and objects

class Bot {
  self = ".Collapsible";
  avatar = `${this.self} button.chat-image`;
  name = `${this.self} h2`;
  description = `${this.self} small`;

  getAvatarUrl() {
    return cy.get(this.avatar).find("img").invoke("attr", "src");
  }

  getDescription() {
    return cy.get(this.description).invoke("text");
  }
}

class BotList {
  self = "nav";

  getBotByName(botName) {
    return cy.get(`${this.self} ${BotListItem.self}`).contains(botName).as("BotListItem");
  }

  selectBotByName(botName) {
    cy.get(BotListItem.self).contains(botName).click();
    cy.get(BotList.self).should("not.be.visible");
  }

  getBotNames() {
    return cy.get(`${BotListItem.self} ${BotListItem.name}`).invoke("text");
  }

  getAllBotListItems() {
    return cy.get(BotListItem.self).then(($items) => {
      return $items.map((_, item) => new BotListItem(item)).get();
    });
  }

  getBotCount() {
    return cy.get(BotListItem.self).its("length");
  }
}

class BotListItem {
  self = `${BotList.self} a`;
  avatar = `${this.self} img`;
  name = `${this.self} span.font-medium`;
  description = `${this.self} span.text-slate-500`;

  getAvatarUrl() {
    return cy.get(this.avatar).invoke("attr", "src");
  }

  getName() {
    return cy.get(this.name).invoke("text");
  }

  getDescription() {
    return cy.get(this.description).invoke("text");
  }
}

class Settings {
  self = 'label[for="settings-input"]';
  menu = `${this.self} .collapse-content`;
  languageDropdown = new LanguageDropdown();

  getMenuItems() {
    return cy.get(`${this.menu} label`).then(($labels) => {
      return $labels.map((_, el) => new SettingsItem(el)).get();
    });
  }

  getItemByName(name) {
    return cy.get(`${this.menu} label:contains("${name}")`).then(($label) => {
      return new SettingsItem($label);
    });
  }

  getItemStatus(name) {
    return this.getItemByName(name).then((item) => {
      return item.getCheckbox().invoke("prop", "checked");
    });
  }

  selectItemByName(name) {
    return this.getItemByName(name).then((item) => {
      item.getCheckbox().click();
      cy.get(this.menu).should("not.be.visible");
    });
  }

  open_menu() {
    cy.get(this.menu).then(($menu) => {
      if (!$menu.is(":visible")) {
        cy.get(this.self).click();
        cy.get(this.menu).should("be.visible");
      }
    });
  }

  close_menu() {
    cy.get(this.menu).then(($menu) => {
      if ($menu.is(":visible")) {
        cy.get(this.self).click();
        cy.get(this.menu).should("be.visible");
      }
    });
  }
}

class SettingsItem {
  constructor(label) {
    self = `${Settings.self} label`;
    checkbox = `${this.self} input`;
    caption = `${this.self} span`;
  }

  getCheckbox() {
    return cy.get(`${this.label} ${this.checkbox}`);
  }

  getCaption() {
    return cy.get(`${this.label} ${this.caption}`);
  }
}

class LanguageDropdown {
  self = `${Settings.self} .select`;

  openDropdown() {
    cy.get(this.self).click();
  }

  selectOptionByName(name) {
    this.openDropdown();
    cy.contains("option", name).click();
  }

  getCurrentSelection() {
    return cy.get(this.self).find("option:selected").invoke("text");
  }
}

class Assumptions {
  self = 'label[for="assumptions-input"]';
  form = `${this.self} #SMChatAsssumptions`;
  ageInput = `${this.form} input[name="age"]`;
  saveButton = `${this.form} button:contains("Save")`;

  open() {
    this.form.then(($form) => {
      if (!$form.is(":visible")) {
        cy.get(this.self).click();
        this.form.should("be.visible");
      }
    });
  }

  close() {
    this.form.then(($form) => {
      if ($form.is(":visible")) {
        cy.get(this.self).click();
        cy.get(this.form).should("not.be.visible");
      }
    });
  }

  getCurrentAge() {
    return cy.get(this.ageInput).invoke("val");
  }

  setAge(age) {
    cy.get(this.ageInput).clear().type(age);
    cy.get(this.saveButton).click();
  }
}

class Sidebar {
  self = "aside";
  bot = new Bot();
  botList = new BotList();
  settings = new Settings();
  assumptions = new Assumptions();

  constructor() {
    this.bot.self = `${this.self} ${this.bot.self}`;
    this.botList.self = `${this.self} ${this.botList.self}`;
    this.settings.self = `${this.self} ${this.settings.self}`;
    this.assumptions.self = `${this.self} ${this.assumptions.self}`;
  }
}

// Chat locators and objects

class Tab {
  // Methods for Tab
}

class Message {
  // Methods for Message
}

class Chat {
  constructor() {
    this.tab = new Tab();
    this.message = new Message();
  }
  // Methods for Chat
}

class ChatPage {
  constructor() {
    this.header = new Header();
    this.sidebar = new Sidebar();
    this.chat = new Chat();
  }

  visit() {
    cy.visit("/");
  }
}

export default ChatPage;
