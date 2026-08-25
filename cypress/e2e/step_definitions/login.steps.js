import { Given, When } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../support/pages/LoginPage';

const loginPage = new LoginPage();

Given('que estou na página de login', () => {
  loginPage.open();
});

When('informo o e-mail e a senha corretos', function () {
  loginPage.login(this.user.email, this.user.password);
});

When('informo o e-mail correto e uma senha inválida', function () {
  loginPage.login(this.user.email, 'SenhaIncorreta!123');
});
