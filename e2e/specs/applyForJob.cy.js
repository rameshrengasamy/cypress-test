import BasePage from '../pages/base.page';
import HomePage from '../pages/home.page';
import CareersPage from '../pages/careers.page';
import PositionPage from '../pages/position.page';
import AcknowledgementPage from '../pages/acknowledgement.page';
import GenderEthnicityPage from '../pages/genderEthnicity.page';
import VateranIdentityPage from '../pages/vateranIdentity.page';
import DisabilityIdentityPage from '../pages/disabilitySelfIdentity.page';
import PersonalInformationPage from '../pages/personalInformation.page';

import homePageFixtures from '../fixtures/homePage.json';
import careersPageFixtures from '../fixtures/careersPage.json';
import genderEthnicityPageFixtures from '../fixtures/genderEthnicity.json';
import veteranIdentityPageFixtures from '../fixtures/vateranIdentityPage.json';
import disabilitySelfIdentityFixtures from '../fixtures/disabilitySelfIdentity.json';
import personalInformationPageFixtures from '../fixtures/personalInformationPage.json';

import homePageSelectors from '../selectors/home.page.json';
import careersPageSelectors from '../selectors/careersPage.json';
import positionPageSelectors from '../selectors/positionPage.json';
import acknowledgementPageSelectors from '../selectors/acknowledgementPage.json';
import genderEthnicityPageSelectors from '../selectors/genderEthnicity.json';
import veteranIdentityPageSelectors from '../selectors/vateranIdentityPage.json';
import disabilitySelfIdentitySelectors from '../selectors/disabilitySelfIdentity.json';
import personalInformationPageSelectors from '../selectors/personalInformationPage.json';

describe('Apply for SDET job with Iodine software', () => {
  const homePage = new HomePage();
  const basePage = new BasePage();
  const careersPage = new CareersPage();
  const positionPage = new PositionPage();
  const acknowledgementPage = new AcknowledgementPage();
  const genderEthnicityPage = new GenderEthnicityPage();
  const vateranIdentityPage = new VateranIdentityPage();
  const disabilitySelfIdentityPage = new DisabilityIdentityPage();
  const personalInformationPage = new PersonalInformationPage();

  before(() => {
    basePage.open(Cypress.config('baseUrl'));
    basePage.getUrl().should('include', homePageFixtures.url);
    cy.getElement(homePageSelectors.logo).should('be.visible');
  });

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      Cypress.runner.stop();
    }
  });

  it('should succesfully navigate to careers page from home page', () => {
    homePage.goToCareersPage();
    basePage.getUrl().should('include', careersPageFixtures.url);
    basePage.checkElementExists(careersPageSelectors.jobFrame);
  });

  it('should succesfully navigate to the position page from careers page', () => {
    careersPage.navigateToSpecificPosition(careersPageFixtures.jobTitleText);
    basePage.checkElementExists(
      positionPageSelectors.iframeId,
      true,
      positionPageSelectors.applyBtn,
    );
  });

  it('should succesfully navigate to the acknowledgement page from position page', () => {
    positionPage.apply();
    basePage.checkElementExists(
      acknowledgementPageSelectors.iframeId,
      true,
      acknowledgementPageSelectors.ackForm,
    );
  });

  it('should succesfully navigate to the gender/ethnicity page from acknowledgement page', () => {
    acknowledgementPage.continue();
    basePage.checkElementExists(
      genderEthnicityPageSelectors.iframeId,
      true,
      genderEthnicityPageSelectors.gender,
    );
  });

  it('should succesfully navigate to the veteran self identity page from gender/ethnicity page', () => {
    genderEthnicityPage.selectGenderAndRace(
      genderEthnicityPageFixtures.gender,
      genderEthnicityPageFixtures.ethnicity,
    );
    basePage.checkElementExists(
      veteranIdentityPageSelectors.iframeId,
      true,
      veteranIdentityPageSelectors.nonVeteran,
    );
  });

  it('should succesfully navigate to the disablity self identity page from veteran self identity page', () => {
    vateranIdentityPage.navigateToDisabilityPage(
      veteranIdentityPageFixtures.status,
    );
    basePage.checkElementExists(
      disabilitySelfIdentitySelectors.iframeId,
      true,
      disabilitySelfIdentitySelectors.declineDisability,
    );
  });

  it('should succesfully navigate to the final personal details page from disability self identity page', () => {
    disabilitySelfIdentityPage.navigateToPersonalDetailsPage(
      disabilitySelfIdentityFixtures.status,
      disabilitySelfIdentityFixtures.name,
      new Date().toISOString().split('T')[0],
    );
    basePage.checkElementExists(
      personalInformationPageSelectors.iframeId,
      true,
      personalInformationPageSelectors.firstName,
    );
  });

  it('should validate invalid email input in personal details page', () => {
    personalInformationPage.addAndSubmitPersonalInformation(
      personalInformationPageFixtures.firstname,
      personalInformationPageFixtures.lastname,
      personalInformationPageFixtures.invalidEmail,
    );
    cy.getElementFromIframe(
      personalInformationPageSelectors.iframeId,
      personalInformationPageSelectors.email,
    ).then(($input) => {
      expect($input[0].validationMessage).to.eq(
        personalInformationPageFixtures.invalidEmailErrorMessage.replace(
          '{email}',
          personalInformationPageFixtures.invalidEmail,
        ),
      );
    });
  });
});
