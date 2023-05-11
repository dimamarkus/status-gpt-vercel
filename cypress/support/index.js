import "./commands";

// Error handling
Cypress.on("uncaught:exception", (err, runnable) => {
  console.error(err);
  return false;
});

// Test execution
beforeEach(() => {
  cy.visit(Cypress.config("baseUrl"));
  cy.intercept("GET", Cypress.config("baseUrl")).as("apiRequest");
  cy.wait("@apiRequest").its("response.statusCode").should("eq", 200);
  cy.get('[class*="ChatLayout_root"]', { timeout: 20000 }).should("be.visible");
});
