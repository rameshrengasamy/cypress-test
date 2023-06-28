import BasePage from './base.page';
import veteranIdentityPageSelectors from '../selectors/vateranIdentityPage.json';

class VateranIdentityPage extends BasePage {
  constructor() {
    super();
  }

  selectVeteranStatus(value) {
    let sel;
    if (value.includes('I AM NOT A PROTECTED VETERAN')) {
      sel = veteranIdentityPageSelectors.nonVeteran;
    } else if (
      value.includes(
        'I IDENTIFY AS ONE OR MORE OF THE CLASSIFICATIONS OF PROTECTED VETERAN LISTED ABOVE',
      )
    ) {
      sel = veteranIdentityPageSelectors.veteran;
    } else if (value.includes('I DO NOT WISH TO IDENTIFY AT THIS TIME')) {
      sel = veteranIdentityPageSelectors.donotIdentify;
    }

    cy.clickElementInIframe(veteranIdentityPageSelectors.iframeId, sel);
  }

  continue() {
    cy.clickElementInIframe(
      veteranIdentityPageSelectors.iframeId,
      veteranIdentityPageSelectors.continueBtn,
    );
  }

  navigateToDisabilityPage(veteranStatus) {
    this.selectVeteranStatus(veteranStatus);
    this.continue();
  }
}

export default VateranIdentityPage;
