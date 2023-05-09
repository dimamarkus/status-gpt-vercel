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

export default function randomString(
  options = { randomLength: [1, 50], letters: true, punctuation: false, digits: true },
) {
  const { randomLength, letters, punctuation, digits } = options;
  let output = "";
  const characters = {
    letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    punctuation: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
    digits: "0123456789",
  };

  if (letters) output += characters.letters;
  if (punctuation) output += characters.punctuation;
  if (digits) output += characters.digits;

  const length =
    Math.floor(Math.random() * (randomLength[1] - randomLength[0] + 1)) + randomLength[0];
  return [...Array(length)]
    .map(() => output.charAt(Math.floor(Math.random() * output.length)))
    .join("");
}
