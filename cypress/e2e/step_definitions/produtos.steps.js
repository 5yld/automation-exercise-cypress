import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ProductsPage from '../../support/pages/ProductsPage';

const productsPage = new ProductsPage();

Given('que estou na página de produtos', () => {
  productsPage.open();
});

When('busco pelo termo {string}', (term) => {
  productsPage.search(term);
});

When('acesso a categoria {string} do grupo {string}', (category, group) => {
  productsPage.openCategory(group, category);
});

Then('devo ver apenas produtos relacionados a {string}', (term) => {
  productsPage.shouldShowSearchResultsFor(term);
});

Then('devo ver a listagem da categoria {string}', (title) => {
  productsPage.shouldShowCategoryTitle(title);
});
