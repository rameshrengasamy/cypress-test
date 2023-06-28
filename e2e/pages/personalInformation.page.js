import BasePage from './base.page';
import personalInformationPageSelectors from '../selectors/personalInformationPage.json';

class PersonalInformationPage extends BasePage {
  constructor() {
    super();
  }

  fillPersonalInfo(firstname, lastname, email) {
    cy.setElementValueInIframe(
      personalInformationPageSelectors.iframeId,
      personalInformationPageSelectors.firstName,
      firstname,
    );
    cy.setElementValueInIframe(
      personalInformationPageSelectors.iframeId,
      personalInformationPageSelectors.lastName,
      lastname,
    );
    cy.setElementValueInIframe(
      personalInformationPageSelectors.iframeId,
      personalInformationPageSelectors.email,
      email,
    );
  }

  submit() {
    cy.clickElementInIframe(
      personalInformationPageSelectors.iframeId,
      personalInformationPageSelectors.submitBtn,
    );
  }

  addAndSubmitPersonalInformation(firstname, lastname, email) {
    this.fillPersonalInfo(firstname, lastname, email);
    this.submit();
  }
}

export default PersonalInformationPage;
