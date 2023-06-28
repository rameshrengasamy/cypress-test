const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'AutoTest - 1',
  userAgent: 'Test Automation User',
  chromeWebSecurity: false,
  numTestsKeptInMemory: 15,
  e2e: {
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        log(message) {
          console.log(message + '\n\n');
          return null;
        },
      });
    },
    fixturesFolder: `${process.cwd()}/e2e/fixtures`,
    downloadsFolder: `${process.cwd()}/results/downloads`,
    supportFile: `${process.cwd()}/e2e/support/index.js`,
    screenshotsFolder: `${process.cwd()}/results/screenshots`,
    videosFolder: `${process.cwd()}/results/videos`,
    baseUrl: 'https://iodinesoftware.com/',
    specPattern: `${process.cwd()}/e2e/**/*.cy.js`,

    excludeSpecPattern: `**/todo.cy.js`,

    testIsolation: false,
    includeShadowDom: false,
    defaultCommandTimeout: 20000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    pageLoadTimeout: 30000,
    video: true,
    watchForFileChanges: false,
    failOnStatusCode: false,
    viewportWidth: 1440,
    viewportHeight: 900,
    screenshotOnRunFailure: true,
    restartBrowserBetweenSpecFiles: true,
    trashAssetsBeforeRuns: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: `${process.cwd()}/results/html`,
      overwrite: false,
      html: true,
      json: true,
    },
  },
});
