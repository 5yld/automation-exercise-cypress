import BasePage from './BasePage';

/**
 * Os nomes de produto usam travessão e espaços irregulares. A normalização
 * evita falha de comparação por diferença de caractere, não de conteúdo.
 */
function normalize(text) {
  return text
    .replace(/[‐-―]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export default class ProductsPage extends BasePage {
  get searchField() {
    return cy.get('#search_product');
  }

  get searchButton() {
    return cy.get('#submit_search');
  }

  get productCards() {
    return cy.get('.features_items .product-image-wrapper');
  }

  get productNames() {
    return cy.get('.features_items .productinfo p');
  }

  get pageTitle() {
    return cy.get('.features_items h2.title');
  }

  get cartModal() {
    return cy.get('#cartModal');
  }

  get continueShoppingButton() {
    return cy.get('#cartModal .close-modal');
  }

  open() {
    this.visit('/products');
    this.pageTitle.should('contain', 'All Products');
    return this;
  }

  search(term) {
    this.searchField.clear().type(term);
    this.searchButton.click();
    return this;
  }

  /**
   * Cada produto tem dois botões "Add to cart": um no card e outro no overlay
   * exibido em hover. Restringir a busca ao `.productinfo` garante que o
   * clique aconteça sempre no elemento visível.
   */
  addProductToCart(productId) {
    cy.get(`.productinfo a.add-to-cart[data-product-id="${productId}"]`)
      .first()
      .click();
    this.cartModal.should('be.visible');
    return this;
  }

  continueShopping() {
    this.continueShoppingButton.click();
    this.cartModal.should('not.be.visible');
    return this;
  }

  openCategory(userType, categoryName) {
    cy.get(`a[href="#${userType}"]`).click();
    cy.get(`#${userType}`).should('be.visible').contains('a', categoryName).click();
    return this;
  }

  /**
   * A busca da aplicação considera nome, marca e categoria do produto, então
   * há resultados legítimos sem o termo no nome (buscar "top" retorna itens
   * da categoria Tops). Validar apenas o nome produziria falso negativo.
   *
   * A verificação compara a listagem exibida com o contrato da API para o
   * mesmo termo, garantindo que a interface apresenta o conjunto correto.
   */
  shouldShowSearchResultsFor(term) {
    this.pageTitle.should('contain', 'Searched Products');

    cy.api('POST', 'searchProduct', { body: { search_product: term } }).then(
      ({ data }) => {
        const expected = data.products.map((product) => normalize(product.name));

        this.productNames.should('have.length', expected.length);
        this.productNames.each(($name) => {
          expect(expected, `produto "${$name.text()}" deve constar na busca`).to
            .include(normalize($name.text()));
        });
      }
    );
    return this;
  }

  shouldShowCategoryTitle(expectedTitle) {
    this.pageTitle.should('contain', expectedTitle);
    return this;
  }
}
