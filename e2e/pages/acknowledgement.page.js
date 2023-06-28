import BasePage from './base.page';
import acknowledgementPageSelectors from '../selectors/acknowledgementPage.json';

class AcknowledgementPage extends BasePage {
  constructor() {
    super();
  }

  navigateBack() {}

  continue() {
    cy.clickElementInIframe(
      acknowledgementPageSelectors.iframeId,
      acknowledgementPageSelectors.continueBtn,
    );
  }
}

export default AcknowledgementPage;
