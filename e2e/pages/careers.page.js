import BasePage from './base.page';
import careersPageSelectors from '../selectors/careersPage.json';

class CareersPage extends BasePage {
  constructor() {
    super();
  }

  navigateToSpecificPosition(positionText) {
    const sel = careersPageSelectors.positionLink.replace(
      '{text}',
      positionText,
    );
    cy.clickElementInIframe(careersPageSelectors.iframeId, sel);
  }
}

export default CareersPage;
