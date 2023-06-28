import BasePage from './base.page';
import homePageSelectors from '../selectors/home.page.json';

class HomePage extends BasePage {
  constructor() {
    super();
  }

  goToCareersPage() {
    super.hoverOverElement(homePageSelectors.companyHeaderLink);
    super.controlWindowTabOpen(homePageSelectors.careersSubMenu);
    super.clickElement(homePageSelectors.careersHeaderSubLink);
    cy.realPress('Tab');
  }
}

export default HomePage;
