import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CartPage from '../../support/pages/CartPage';
import CheckoutPage from '../../support/pages/CheckoutPage';
import PaymentPage from '../../support/pages/PaymentPage';

const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const paymentPage = new PaymentPage();

When('avanço para o checkout', () => {
  cartPage.proceedToCheckout();
});

When('informo os dados do cartão e confirmo o pagamento', () => {
  checkoutPage.addComment('Pedido gerado por teste automatizado.');
  checkoutPage.placeOrder();

  paymentPage.shouldBeOpen();
  cy.fixture('paymentCard').then((card) => {
    paymentPage.fillCardDetails(card).confirmPayment();
  });
});

Then('devo ver meu endereço de entrega e o resumo do pedido', function () {
  checkoutPage.shouldBeOpen().shouldShowDeliveryAddressFor(this.user);
});

Then('devo ver a confirmação do pedido', () => {
  paymentPage.shouldShowOrderConfirmation();
});
