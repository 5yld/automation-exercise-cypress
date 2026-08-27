import BasePage from './BasePage';

export default class CartPage extends BasePage {
  get cartTable() {
    return cy.get('#cart_info_table');
  }

  get rows() {
    return cy.get('#cart_info_table tbody tr');
  }

  get emptyCartMessage() {
    return cy.get('#empty_cart');
  }

  get proceedToCheckoutButton() {
    return cy.contains('a.check_out', 'Proceed To Checkout');
  }

  row(productId) {
    return cy.get(`#product-${productId}`);
  }

  open() {
    cy.visit('/view_cart');
    return this;
  }

  removeProduct(productId) {
    this.row(productId).find('.cart_quantity_delete').click();
    return this;
  }

  proceedToCheckout() {
    this.proceedToCheckoutButton.click();
    return this;
  }

  shouldContainProduct(productId, productName) {
    this.row(productId)
      .should('be.visible')
      .within(() => {
        cy.get('.cart_description h4 a').should('have.text', productName);
        cy.get('.cart_price p').should('not.be.empty');
        cy.get('.cart_total_price').should('not.be.empty');
      });
    return this;
  }

  shouldHaveQuantity(productId, quantity) {
    this.row(productId)
      .find('.cart_quantity button')
      .should('have.text', String(quantity));
    return this;
  }

  shouldNotContainProduct(productId) {
    cy.get(`#product-${productId}`).should('not.exist');
    return this;
  }

  shouldBeEmpty() {
    this.emptyCartMessage.should('be.visible').and('contain', 'Cart is empty');
    return this;
  }
}
