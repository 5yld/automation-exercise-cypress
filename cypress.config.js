const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',

    specPattern: [
      'cypress/e2e/features/**/*.feature',
      'cypress/e2e/api/**/*.cy.js',
    ],
    supportFile: 'cypress/support/e2e.js',

    screenshotOnRunFailure: true,
    video: true,
    videoCompression: 32,

    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    retries: { runMode: 2, openMode: 0 },

    viewportWidth: 1440,
    viewportHeight: 900,

    // A aplicação carrega anúncios em iframe que sobrepõem elementos e
    // interceptam cliques. Bloquear os domínios elimina a intermitência.
    blockHosts: [
      '*googlesyndication.com',
      '*doubleclick.net',
      '*google-analytics.com',
      '*googletagmanager.com',
      '*googletagservices.com',
      '*adservice.google.com',
      '*adnxs.com',
    ],

    async setupNodeEvents(on, config) {
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );
      return config;
    },
  },
});
