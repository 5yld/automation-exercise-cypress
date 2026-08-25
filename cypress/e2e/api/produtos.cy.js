import { validateSchema } from '../../support/validateSchema';
import productsListSchema from '../../fixtures/schemas/productsList.schema.json';

describe('API - Produtos e Marcas', () => {
  context('A01 - GET /productsList', () => {
    it('@smoke @regression retorna a lista de produtos', () => {
      cy.api('GET', 'productsList').then(({ data }) => {
        expect(data.responseCode).to.eq(200);
        expect(data.products).to.be.an('array').and.not.be.empty;

        const product = data.products[0];
        expect(product).to.include.all.keys(
          'id',
          'name',
          'price',
          'brand',
          'category'
        );
      });
    });

    // A10 - BONUS: validação programática de schema
    it('@regression respeita o contrato definido no JSON Schema', () => {
      cy.api('GET', 'productsList').then(({ data }) => {
        validateSchema(productsListSchema, data);
      });
    });
  });

  context('A02 - GET /brandsList', () => {
    it('@regression retorna a lista de marcas', () => {
      cy.api('GET', 'brandsList').then(({ data }) => {
        expect(data.responseCode).to.eq(200);
        expect(data.brands).to.be.an('array').and.not.be.empty;

        data.brands.forEach((brand) => {
          expect(brand).to.include.all.keys('id', 'brand');
          expect(brand.id).to.be.a('number');
          expect(brand.brand).to.be.a('string').and.not.be.empty;
        });
      });
    });
  });

  context('A03 - POST /searchProduct com parâmetro válido', () => {
    it('@regression retorna apenas produtos relacionados ao termo', () => {
      const term = 'top';

      cy.api('POST', 'searchProduct', { body: { search_product: term } }).then(
        ({ data }) => {
          expect(data.responseCode).to.eq(200);
          expect(data.products).to.be.an('array').and.not.be.empty;

          // A busca cobre nome, marca e categoria, então o termo pode casar
          // com qualquer um desses campos.
          data.products.forEach((product) => {
            const searchable = [
              product.name,
              product.brand,
              product.category.category,
              product.category.usertype.usertype,
            ]
              .join(' ')
              .toLowerCase();

            expect(searchable, `produto "${product.name}"`).to.include(
              term.toLowerCase()
            );
          });
        }
      );
    });
  });

  context('A04 - POST /searchProduct sem o parâmetro obrigatório', () => {
    it('@regression informa erro 400 no corpo, mantendo HTTP 200', () => {
      cy.api('POST', 'searchProduct').then((response) => {
        expect(response.status, 'status HTTP').to.eq(200);
        expect(response.data.responseCode, 'código no corpo').to.eq(400);
        expect(response.data.message).to.eq(
          'Bad request, search_product parameter is missing in POST request.'
        );
      });
    });
  });
});
