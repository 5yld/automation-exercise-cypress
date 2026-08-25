import BasePage from './BasePage';

export default class CheckoutPage extends BasePage {
  get deliveryAddress() {
    return cy.get('#address_delivery');
  }

  get invoiceAddress() {
    return cy.get('#address_invoice');
  }

  get orderReviewTable() {
    return cy.get('#cart_info_table');
  }

  get commentField() {
    return cy.get('textarea[name="message"]');
  }

  get placeOrderButton() {
    return cy.contains('a.check_out', 'Place Order');
  }

  shouldBeOpen() {
    cy.contains('h2', 'Address Details').should('be.visible');
    cy.contains('h2', 'Review Your Order').should('be.visible');
    return this;
  }

  shouldShowDeliveryAddressFor(user) {
    this.deliveryAddress.should('contain', user.firstName);
    this.deliveryAddress.should('contain', user.address1);
    this.deliveryAddress.should('contain', user.city);
    return this;
  }

  addComment(comment) {
    this.commentField.type(comment);
    return this;
  }

  placeOrder() {
    this.placeOrderButton.click();
    return this;
  }
}
