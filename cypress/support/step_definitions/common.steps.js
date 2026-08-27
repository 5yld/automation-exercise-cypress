import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../support/pages/LoginPage';
import BasePage from '../../support/pages/BasePage';
import { buildUser } from '../../support/factories/userFactory';

const loginPage = new LoginPage();
const basePage = new BasePage();

/**
 * Steps reutilizados por mais de uma feature. O Cucumber carrega todas as
 * definições no mesmo escopo: a mesma frase não pode ser definida duas vezes.
 */

Given('que existe uma conta cadastrada', () => {
  cy.createUserViaApi(buildUser()).as('user');
});

Given('que estou autenticado no site', function () {
  loginPage.open().login(this.user.email, this.user.password);
  basePage.shouldBeLoggedInAs(this.user.name);
});

Then('devo estar autenticado no site', function () {
  basePage.shouldBeLoggedInAs(this.user.name);
});

Then('não devo estar autenticado no site', () => {
  basePage.shouldBeLoggedOut();
});

Then('devo ver a mensagem {string}', (message) => {
  loginPage.shouldShowError(message);
});
