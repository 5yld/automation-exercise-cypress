import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ProductsPage from '../../support/pages/ProductsPage';
import CartPage from '../../support/pages/CartPage';

const productsPage = new ProductsPage();
const cartPage = new CartPage();

function addProduct(productId) {
  cy.wrap(productId).as('productId');
  productsPage.addProductToCart(productId);
  productsPage.continueShopping();
}

Given('que adicionei ao carrinho o produto {int}', (productId) => {
  addProduct(productId);
});

When('adiciono ao carrinho o produto {int}', (productId) => {
  addProduct(productId);
});

When('acesso o carrinho', () => {
  cartPage.open();
});

When('removo o produto do carrinho', function () {
  cartPage.removeProduct(this.productId);
});

Then('o produto {string} deve estar no carrinho', function (productName) {
  cartPage.shouldContainProduct(this.productId, productName);
});

Then('a quantidade do produto deve ser {int}', function (quantity) {
  cartPage.shouldHaveQuantity(this.productId, quantity);
});

Then('o carrinho deve estar vazio', () => {
  cartPage.shouldBeEmpty();
});
