require('dotenv').config({ path: 'variables.env' });

const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    stepDefinitions: 'cypress/support/step_definitions/**/*.js',
 
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

    retries: {
      runMode: 1,
      openMode: 0,
    },

    viewportWidth: 1440,
    viewportHeight: 900,

    env: {
      USER_NAME: process.env.USER_NAME,
      USER_PASSWORD: process.env.USER_PASSWORD,
      USER_COMPANY: process.env.USER_COMPANY,
      USER_ADDRESS1: process.env.USER_ADDRESS1,
      USER_ADDRESS2: process.env.USER_ADDRESS2,
      USER_MOBILE: process.env.USER_MOBILE,
    },

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
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});