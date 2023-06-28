class BasePage {
  constructor() {}

  open(path) {
    cy.visit(path);
  }

  hoverOverElement(selector) {
    return cy.getElement(selector).realHover({ position: 'topLeft' });
  }

  clickElement(selector) {
    return cy.getElement(selector).click();
  }

  setValue(selector, value) {
    return cy.getElement(selector).type(value);
  }

  controlWindowTabOpen(selector) {
    return cy.getElement(selector).invoke('removeAttr', 'target');
  }

  getUrl() {
    return cy.url();
  }

  checkElementExists(selector, iframe = 'false', iframeId) {
    if (iframe === 'true') {
      return cy.getElementFromIframe(iframeId, selector).then(($el) => {
        expect($el).to.exist;
      });
    }
    return cy.getElement(selector).should('exist');
  }
}

export default BasePage;
