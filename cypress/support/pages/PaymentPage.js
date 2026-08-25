import BasePage from './BasePage';

export default class PaymentPage extends BasePage {
  get nameOnCardField() {
    return cy.get('[data-qa="name-on-card"]');
  }

  get cardNumberField() {
    return cy.get('[data-qa="card-number"]');
  }

  get cvcField() {
    return cy.get('[data-qa="cvc"]');
  }

  get expiryMonthField() {
    return cy.get('[data-qa="expiry-month"]');
  }

  get expiryYearField() {
    return cy.get('[data-qa="expiry-year"]');
  }

  get payButton() {
    return cy.get('[data-qa="pay-button"]');
  }

  shouldBeOpen() {
    cy.contains('h2', 'Payment').should('be.visible');
    return this;
  }

  fillCardDetails(card) {
    this.nameOnCardField.type(card.nameOnCard);
    this.cardNumberField.type(card.number);
    this.cvcField.type(card.cvc);
    this.expiryMonthField.type(card.expiryMonth);
    this.expiryYearField.type(card.expiryYear);
    return this;
  }

  confirmPayment() {
    this.payButton.click();
    return this;
  }

  shouldShowOrderConfirmation() {
    cy.url().should('include', '/payment_done/');
    cy.get('[data-qa="order-placed"]').should('be.visible');
    cy.contains('Congratulations! Your order has been confirmed!').should(
      'be.visible'
    );
    return this;
  }
}
