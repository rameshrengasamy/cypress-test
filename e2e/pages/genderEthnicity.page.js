import BasePage from './base.page';
import genderEthnicityPageSelectors from '../selectors/genderEthnicity.json';

class SelfIdentityPage extends BasePage {
  constructor() {
    super();
  }

  navigateBack() {}

  selectGender(gender) {
    const sel = genderEthnicityPageSelectors.gender.replace('{gender}', gender);
    cy.clickElementInIframe(genderEthnicityPageSelectors.iframeId, sel);
  }

  selectRace(race) {
    cy.getElementFromIframe(
      genderEthnicityPageSelectors.iframeId,
      genderEthnicityPageSelectors.ethnicity,
    ).each(($el) => {
      if ($el.siblings().text().includes(race)) {
        cy.wrap($el).click();
      }
    });
  }

  selectGenderAndRace(gender, race) {
    this.selectGender(gender);
    this.selectRace(race);
    cy.clickElementInIframe(
      genderEthnicityPageSelectors.iframeId,
      genderEthnicityPageSelectors.continueBtn,
    );
  }
}

export default SelfIdentityPage;
