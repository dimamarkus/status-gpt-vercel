export function checkState(elements, shouldType) {
  elements.forEach((element) => {
    element.should(shouldType);
  });
}

export function waitForElementsCount(selector, count = 1) {
  cy.get(selector, { timeout: Cypress.config("defaultCommandTimeout") }).should(
    "have.length",
    count,
  );
}
