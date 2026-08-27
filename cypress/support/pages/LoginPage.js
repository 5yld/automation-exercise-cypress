import BasePage from './BasePage';

export default class LoginPage extends BasePage {
  get emailField() {
    return cy.get('[data-qa="login-email"]');
  }

  get passwordField() {
    return cy.get('[data-qa="login-password"]');
  }

  get loginButton() {
    return cy.get('[data-qa="login-button"]');
  }

  get signupNameField() {
    return cy.get('[data-qa="signup-name"]');
  }

  get signupEmailField() {
    return cy.get('[data-qa="signup-email"]');
  }

  get signupButton() {
    return cy.get('[data-qa="signup-button"]');
  }

  get errorMessage() {
    return cy.get('form p[style*="color"]');
  }

  open() {
    cy.visit('/login');
    cy.contains('h2', 'Login to your account').should('be.visible');
    return this;
  }

  /**
   * Realizar Login
   * @param {string} email 
   * @param {string} password 
   * @returns 
   */
  login(email, password) {
    this.emailField.clear().type(email);
    this.passwordField.clear().type(password, { log: false });
    this.loginButton.click();
    return this;
  }
  /**
   * Realizar Cadastro
   * @param {string} name 
   * @param {string} email 
   * @returns 
   */
  startSignup(name, email) {
    this.signupNameField.clear().type(name);
    this.signupEmailField.clear().type(email);
    this.signupButton.click();
    return this;
  }
  /**
   * Retorno de erro
   * @param {string} message 
   * @returns 
   */
  shouldShowError(message) {
    this.errorMessage.should('be.visible').and('have.text', message);
    return this;
  }
}
