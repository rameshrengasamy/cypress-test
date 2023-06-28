// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

let getElementByXpathJS = function (xPathExpression, container = document) {
  return document.evaluate(
    xPathExpression,
    container,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue;
};

Cypress.Commands.add('getElement', (selector, ...args) => {
  let regExpression = /^(\.?\/\/?[*\w])/gim;
  if (typeof selector === 'string' && regExpression.test(selector)) {
    return cy.document().then((cyDOM) => {
      return getElementByXpathJS(selector, cyDOM.documentElement);
    });
  } else {
    return cy.get(selector, ...args);
  }
});

Cypress.Commands.add(
  'getElementFromIframe',
  (iframeSelector, elementSelector) =>
    cy
      .getElement(iframeSelector)
      .its('0.contentDocument.body')
      .should('not.be.empty', { timeout: 15000 })
      .then((body) => {
        cy.wrap(body).find(elementSelector);
      }),
);

Cypress.Commands.add(
  'clickElementInIframe',
  (iframeSelector, elementSelector) =>
    cy
      .getElement(iframeSelector)
      .its('0.contentDocument.body')
      .should('not.be.empty', { timeout: 15000 })
      .then((body) => {
        cy.wrap(body).find(elementSelector).click();
        cy.wait(800);
      }),
);

Cypress.Commands.add(
  'setElementValueInIframe',
  (iframeSelector, elementSelector, value) =>
    cy
      .getElement(iframeSelector)
      .its('0.contentDocument.body')
      .should('not.be.empty', { timeout: 15000 })
      .then((body) => {
        cy.wrap(body)
          .find(elementSelector)
          .clear()
          .wait(500)
          .type(value, { delay: 50 })
          .should('have.value', value);
        cy.wait(800);
      }),
);
