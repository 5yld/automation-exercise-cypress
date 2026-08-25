import BasePage from './BasePage';

export default class SignupPage extends BasePage {
  get titleRadio() {
    return cy.get('#id_gender1');
  }

  get nameField() {
    return cy.get('[data-qa="name"]');
  }

  get passwordField() {
    return cy.get('[data-qa="password"]');
  }

  get daysSelect() {
    return cy.get('[data-qa="days"]');
  }

  get monthsSelect() {
    return cy.get('[data-qa="months"]');
  }

  get yearsSelect() {
    return cy.get('[data-qa="years"]');
  }

  get newsletterCheckbox() {
    return cy.get('#newsletter');
  }

  get firstNameField() {
    return cy.get('[data-qa="first_name"]');
  }

  get lastNameField() {
    return cy.get('[data-qa="last_name"]');
  }

  get companyField() {
    return cy.get('[data-qa="company"]');
  }

  get address1Field() {
    return cy.get('[data-qa="address"]');
  }

  get countrySelect() {
    return cy.get('[data-qa="country"]');
  }

  get stateField() {
    return cy.get('[data-qa="state"]');
  }

  get cityField() {
    return cy.get('[data-qa="city"]');
  }

  get zipcodeField() {
    return cy.get('[data-qa="zipcode"]');
  }

  get mobileNumberField() {
    return cy.get('[data-qa="mobile_number"]');
  }

  get createAccountButton() {
    return cy.get('[data-qa="create-account"]');
  }

  get continueButton() {
    return cy.get('[data-qa="continue-button"]');
  }

  shouldBeOpen() {
    cy.contains('b', 'Enter Account Information').should('be.visible');
    return this;
  }

  fillAccountInformation(user) {
    this.titleRadio.check();
    this.passwordField.type(user.password, { log: false });
    this.daysSelect.select(user.birthDate);
    this.monthsSelect.select(user.birthMonth);
    this.yearsSelect.select(user.birthYear);
    this.newsletterCheckbox.check();
    return this;
  }

  fillAddressInformation(user) {
    this.firstNameField.type(user.firstName);
    this.lastNameField.type(user.lastName);
    this.companyField.type(user.company);
    this.address1Field.type(user.address1);
    this.countrySelect.select(user.country);
    this.stateField.type(user.state);
    this.cityField.type(user.city);
    this.zipcodeField.type(user.zipcode);
    this.mobileNumberField.type(user.mobileNumber);
    return this;
  }

  submit() {
    this.createAccountButton.click();
    return this;
  }

  createAccount(user) {
    return this.fillAccountInformation(user).fillAddressInformation(user).submit();
  }

  shouldShowAccountCreated() {
    cy.get('[data-qa="account-created"]').should('be.visible');
    return this;
  }

  continueAfterCreation() {
    this.continueButton.click();
    return this;
  }

  /**
   * Os campos obrigatórios usam validação nativa do HTML5, que não gera
   * mensagem no DOM: a checagem é feita pela validity API do próprio campo.
   */
  shouldBlockSubmissionOn(fieldAlias) {
    cy.get(fieldAlias).then(($field) => {
      expect($field[0].checkValidity(), 'campo deve ser inválido').to.be.false;
      expect($field[0].validationMessage).to.not.be.empty;
    });
    return this;
  }
}
