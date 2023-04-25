// globalSidebar.js
// Description: Contains the Sidebar class representing the sidebar component with locators and objects.
// Author: Iliya Vereshchagin
// Date: 20.04.2023

import { waitForElementsCount } from "../../utils/helpers";

class Bot {
  self = 'header[class*="collapsible"]';

  get container() {
    return cy.get(this.self);
  }

  get avatar() {
    return cy.get(`${this.self} button.chat-image`);
  }

  get name() {
    return cy.get(`${this.self} h2`);
  }

  get description() {
    return cy.get(`${this.self} small`);
  }

  getAvatarUrl() {
    return this.avatar.find("img").invoke("attr", "src");
  }

  getDescription() {
    return this.description.invoke("text");
  }
}

class BotList {
  self = "nav";

  get container() {
    return cy.get(this.self);
  }

  getBotByName(botName) {
    return cy.get(`${this.self} ${BotListItem.self}`).contains(botName).as("BotListItem");
  }

  selectBotByName(botName) {
    cy.get(BotListItem.self).contains(botName).click();
    this.container.should("not.be.visible");
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

  get container() {
    return cy.get(this.self);
  }

  get avatar() {
    return cy.get(`${this.self} img`);
  }

  get name() {
    return cy.get(`${this.self} span.font-medium`);
  }

  get description() {
    return cy.get(`${this.self} span.text-slate-500`);
  }

  getAvatarUrl() {
    return this.avatar.invoke("attr", "src");
  }

  getName() {
    return this.name.invoke("text");
  }

  getDescription() {
    return this.description.invoke("text");
  }
}

class Settings {
  self = 'label[for="settings-input"]';
  languageDropdown = new LanguageDropdown();

  get container() {
    return cy.get(this.self);
  }

  get menu() {
    return cy.get(`${this.self} .collapse-content`);
  }

  getMenuItems() {
    return this.menu.then(($menu) => {
      return $menu
        .find("label")
        .map((_, el) => new SettingsItem(el))
        .get();
    });
  }

  getItemByName(name) {
    return this.menu.then(($menu) => {
      return $menu.find(`label:contains("${name}")`).then(($label) => {
        return new SettingsItem($label);
      });
    });
  }

  getItemStatus(name) {
    return this.getItemByName(name).then((item) => {
      return item.checkbox.invoke("prop", "checked");
    });
  }

  selectItemByName(name) {
    return this.getItemByName(name).then((item) => {
      item.checkbox.click();
      this.menu.should("not.be.visible");
    });
  }

  open_menu() {
    this.container.then(($container) => {
      if (!$container.hasClass("open")) {
        cy.wrap($container).click();
        this.menu.should("be.visible");
      }
    });
  }

  close_menu() {
    this.container.then(($container) => {
      if ($container.hasClass("open")) {
        cy.wrap($container).click();
        this.menu.should("not.be.visible");
      }
    });
  }
}

class SettingsItem {
  constructor(label) {
    self = `${Settings.self} label`;
  }

  get checkbox() {
    return cy.get(`${this.label} ${this.checkbox}`);
  }

  get caption() {
    return cy.get(`${this.label} ${this.caption}`);
  }
}

class LanguageDropdown {
  self = `${Settings.self} .select`;

  get container() {
    return cy.get(this.self);
  }

  openDropdown() {
    this.container.click();
  }

  selectOptionByName(name) {
    this.openDropdown();
    cy.contains("option", name).click();
  }

  getCurrentSelection() {
    return this.container.find("option:selected").invoke("text");
  }
}

class Assumptions {
  self = 'label[for="assumptions-input"]';

  get container() {
    return cy.get(this.self);
  }

  get form() {
    return cy.get(`${this.self} #SMChatAsssumptions`);
  }

  get ageInput() {
    return cy.get(`${this.form} input[name="age"]`);
  }

  get saveButton() {
    return cy.get((saveButton = `${this.form} button:contains("Save")`));
  }

  open() {
    this.form.then(($form) => {
      if (!$form.is(":visible")) {
        this.container.click();
        this.form.should("be.visible");
      }
    });
  }

  close() {
    this.form.then(($form) => {
      if ($form.is(":visible")) {
        this.container.click();
        this.form.should("not.be.visible");
      }
    });
  }

  getCurrentAge() {
    return this.ageInput.invoke("val");
  }

  setAge(age) {
    this.ageInput.clear().type(age);
    this.saveButton.click();
  }
}

class Conversations {
  static itemSelector = 'section:has(label[for*="conversations-input"])';

  constructor() {
    this.self = 'section:has(label[for*="conversations-input"])';
  }

  get container() {
    return cy.get(this.self);
  }

  get header() {
    return cy.get(`${this.self} label`);
  }

  get menu() {
    return cy.get(`${this.self} .collapse-content`);
  }

  get addConversationButton() {
    return cy.get(`${this.self} button:contains('Add Conversation')`);
  }

  get addConversationIcon() {
    return cy.get(`${this.self}  button.btn`);
  }

  get filterInput() {
    return cy.get(`${this.self} input`);
  }

  open() {
    this.menu.then(($menu) => {
      if ($menu.is(":hidden")) {
        this.header.click();
        this.menu.should("be.visible");
      }
    });
  }

  close() {
    this.menu.then(($menu) => {
      if ($menu.is(":visible")) {
        this.header.click();
        this.menu.should("not.be.visible");
      }
    });
  }

  getItemByIndex(index) {
    return new ConversationItem(`:nth-child(${index})`);
  }

  getItemByName(name) {
    return new ConversationItem(` button:contains('${name}')`);
  }

  getAllItems() {
    return cy.get(this.self, { log: false }).then(($self) => {
      if ($self) {
        return $self
          .find(ConversationItem.itemSelector)
          .map((index, item) => new ConversationItem(`:nth-child(${index + 1})`))
          .get();
      } else {
        return [];
      }
    });
  }

  addConversation(method = "icon") {
    if (method == "icon") {
      this.addConversationIcon.click();
    } else {
      this.addConversationButton.click();
    }
  }

  waitForElementsCount(expectedCount) {
    this.getAllItems().should("have.length", expectedCount);
  }

  get clearButton() {
    return cy.get(`${this.self} button:contains("Clear Conversations")`);
  }

  get importButton() {
    return cy.get(`${this.self} button:contains("Import conversations")`);
  }

  get exportButton() {
    return cy.get(`${this.self} button:contains("Export conversations")`);
  }

  get zeroState() {
    return cy.get('span:contains("No conversations.")');
  }
}

class ConversationItem {
  constructor(selector) {
    this.self = `${Conversations.itemSelector} li.relative.flex.items-center${selector}`;
  }

  static itemSelector = "li.relative.flex.items-center";

  get container() {
    return cy.get(this.self);
  }

  get caption() {
    return cy.get(`${this.self} div`);
  }

  get editButton() {
    return cy.get(`${this.self} .visible button:nth-child(1)`);
  }

  get deleteButton() {
    return cy.get(`${this.self} .visible button:nth-child(2)`);
  }

  get editInput() {
    return cy.get(`${this.self} input`);
  }

  get confirmButton() {
    return cy.get(`${this.self} .visible button.text-green-400`);
  }

  get cancelButton() {
    return cy.get(`${this.self} .visible button.text-red-300`);
  }

  rename(newName) {
    this.editButton.click();
    this.editInput.clear().type(newName);
    this.confirmButton.click();
    this.caption.should("contain", newName);
    this.editInput.should("not.exist");
  }

  delete() {
    this.deleteButton.click();
    this.confirmButton.click();
    this.container.should("not.exist");
  }
}

class Sidebar {
  self = "aside";
  bot = new Bot();
  botList = new BotList();
  settings = new Settings();
  assumptions = new Assumptions();
  conversations = new Conversations();

  // Constructor for defining locators
  constructor() {
    this.bot.self = `${this.self} ${this.bot.self}`;
    this.botList.self = `${this.self} ${this.botList.self}`;
    this.settings.self = `${this.self} ${this.settings.self}`;
    this.assumptions.self = `${this.self} ${this.assumptions.self}`;
    this.conversations.self = `${this.self} ${this.conversations.self}`;
  }

  // Sidebar container locator
  get container() {
    return cy.get(this.self);
  }
}

export default Sidebar;
