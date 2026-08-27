export default class BasePage {
  get signupLoginLink() {
    return cy.get('a[href="/login"]');
  }

  get logoutLink() {
    return cy.get('a[href="/logout"]');
  }

  get deleteAccountLink() {
    return cy.get('a[href="/delete_account"]');
  }

  get cartLink() {
    return cy.get('a[href="/view_cart"]').first();
  }

  get productsLink() {
    return cy.get('a[href="/products"]').first();
  }

//  visit(path = '/') {
//    cy.visit(path);
//    return this;
//  }

  goToProducts() {
    this.productsLink.click();
    return this;
  }

  goToCart() {
    this.cartLink.click();
    return this;
  }

  logout() {
    this.logoutLink.click();
    return this;
  }

  /**
   * O cabeçalho exibe "Logged in as <nome>" quando há sessão ativa. É uma
   * verificação mais confiável que a URL, porque reflete o estado real.
   */
  shouldBeLoggedInAs(name) {
    cy.contains('li', 'Logged in as').should('be.visible').and('contain', name);
    return this;
  }

  shouldBeLoggedOut() {
    cy.contains('a', 'Signup / Login').should('be.visible');
    return this;
  }
}
