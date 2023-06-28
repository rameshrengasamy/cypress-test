import BasePage from './base.page';
import disabilitySelfIdentityPageSelectors from '../selectors/disabilitySelfIdentity.json';

class DisabilityIdentityPage extends BasePage {
  constructor() {
    super();
  }

  selectDisabilityStatus(value) {
    let sel;
    if (
      value.includes(
        'Yes, I Have A Disability, Or Have A History/Record Of Having A Disability',
      )
    ) {
      sel = disabilitySelfIdentityPageSelectors.disability;
    } else if (
      value.includes(
        "No, I Don't Have A Disability, Or A History/Record Of Having A Disability",
      )
    ) {
      sel = disabilitySelfIdentityPageSelectors.noDisability;
    } else if (value.includes("I Don't Wish To Answer")) {
      sel = disabilitySelfIdentityPageSelectors.declineDisability;
    }
    cy.clickElementInIframe(disabilitySelfIdentityPageSelectors.iframeId, sel);
  }

  acknowledge(name, date) {
    cy.setElementValueInIframe(
      disabilitySelfIdentityPageSelectors.iframeId,
      disabilitySelfIdentityPageSelectors.name,
      name,
    );
    cy.setElementValueInIframe(
      disabilitySelfIdentityPageSelectors.iframeId,
      disabilitySelfIdentityPageSelectors.date,
      date,
    );
  }

  continue() {
    cy.clickElementInIframe(
      disabilitySelfIdentityPageSelectors.iframeId,
      disabilitySelfIdentityPageSelectors.continueBtn,
    );
  }

  navigateToPersonalDetailsPage(disabilityStatus, name, date) {
    this.selectDisabilityStatus(disabilityStatus);
    this.acknowledge(name, date);
    this.continue();
  }
}

export default DisabilityIdentityPage;
