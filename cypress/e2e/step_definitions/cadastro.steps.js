import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../support/pages/LoginPage';
import SignupPage from '../../support/pages/SignupPage';
import { buildUser } from '../../support/factories/userFactory';

const loginPage = new LoginPage();
const signupPage = new SignupPage();

When('inicio o cadastro com um nome e e-mail novos', function () {
  const user = buildUser();
  cy.wrap(user).as('user');
  loginPage.startSignup(user.name, user.email);
  signupPage.shouldBeOpen();
});

When('inicio o cadastro com o e-mail de uma conta existente', function () {
  loginPage.startSignup(this.user.name, this.user.email);
});

When('preencho os dados da conta e do endereço', function () {
  signupPage.createAccount(this.user);
});

When('submeto o formulário sem preencher a senha', () => {
  signupPage.createAccountButton.click();
});

Then('minha conta deve ser criada com sucesso', () => {
  signupPage.shouldShowAccountCreated();
  signupPage.continueAfterCreation();
});

Then('o campo de senha deve impedir o envio do formulário', () => {
  signupPage.shouldBlockSubmissionOn('[data-qa="password"]');
});
