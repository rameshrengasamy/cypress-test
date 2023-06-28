import BasePage from './base.page';
import positionPageSelectors from '../selectors/positionPage.json';

class PositionPage extends BasePage {
  constructor() {
    super();
  }

  apply(applySource = 'internal') {
    let sel;
    if (applySource === 'indeed') {
      sel = positionPageSelectors.indeedApplyBtn;
    } else {
      sel = positionPageSelectors.applyBtn;
    }
    cy.clickElementInIframe(positionPageSelectors.iframeId, sel);
  }
}

export default PositionPage;
