/**
 * Wrapper para a API do automationexercise.
 *
 * A API responde sempre HTTP 200, inclusive em erro: o código real vem em
 * `responseCode` no corpo. Como o Content-Type é text/html, o Cypress também
 * não faz o parse do JSON. Este comando concentra os dois contornos e expõe
 * o corpo já parseado em `response.data`.
 */
Cypress.Commands.add('api', (method, path, options = {}) => {
  return cy
    .request({
      method,
      url: `/api/${path.replace(/^\/+/, '')}`,
      failOnStatusCode: false,
      form: true,
      ...options,
    })
    .then((response) => {
      response.data =
        typeof response.body === 'string'
          ? JSON.parse(response.body)
          : response.body;
      return response;
    });
});

/**
 * Cria um usuário pela API para uso como massa de teste.
 * Usado no preparo de cenários cujo objetivo não é o cadastro em si.
 */
Cypress.Commands.add('createUserViaApi', (user) => {
  return cy
    .api('POST', 'createAccount', { body: user.toApiPayload() })
    .then(({ data }) => {
      expect(data.responseCode, 'usuário criado no preparo').to.eq(201);
      return user;
    });
});

/**
 * Deleta um usuário pela API para uso como massa de teste.
 */
Cypress.Commands.add('deleteUserViaApi', (user) => {
  return cy.api('DELETE', 'deleteAccount', {
    body: { email: user.email, password: user.password },
  });
});
