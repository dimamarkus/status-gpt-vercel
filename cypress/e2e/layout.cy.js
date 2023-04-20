/// <reference types="cypress" />

context("Home Page", () => {
  it("checks chat widget", () => {
    cy.get(".chat-widget").should("be.visible");
  });
  it("opens and closes chat", () => {
    cy.get(".chat-widget").click();
    cy.get(".chat-container").should("be.visible");
    cy.get(".chat-close").click();
    cy.get(".chat-container").should("not.be.visible");
  });
});
