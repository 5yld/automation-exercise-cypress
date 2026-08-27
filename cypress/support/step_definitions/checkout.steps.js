import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import PaymentPage from '../pages/PaymentPage';

const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const paymentPage = new PaymentPage();

When('avanço para o checkout', () => {
  cartPage.proceedToCheckout();
});

When('informo os dados do cartão', () => {
  checkoutPage.addComment('Pedido gerado por teste automatizado.');
  checkoutPage.placeOrder();

  paymentPage.shouldBeOpen();

  cy.fixture('paymentCard').then((card) => {
    paymentPage.fillCardDetails(card);
  });
});

When('confirmo o pagamento', () => {
  paymentPage.confirmPayment();
});

Then('devo ver a confirmação do pedido', () => {
  paymentPage.shouldShowOrderConfirmation();
});

Then('os detalhes do pedido realizado', () => {
  paymentPage.shouldShowOrderDetails();
});