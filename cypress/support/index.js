import "./commands";

// Error handling
Cypress.on("uncaught:exception", (err, runnable) => {
  console.error(err);
  return false;
});

// Test execution
beforeEach(() => {
  cy.visit(Cypress.config("baseUrl"));
  cy.get('[class*="ChatLayout_root"]').should("be.visible");
});
