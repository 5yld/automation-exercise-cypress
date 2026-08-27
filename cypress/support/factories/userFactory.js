export function buildUser(overrides = {}) {
  const uniqueId = `${Date.now()}${Math.floor(Math.random() * 10000)}`;

  /**
   * Informações de Usuário
   */
  const user = {
    name: Cypress.env('USER_NAME'),
    email: `qa.desafio.${uniqueId}@mailinator.com`,
    password: Cypress.env('USER_PASSWORD'),

    title: 'Mr',
    birthDate: '10',
    birthMonth: 'May',
    birthYear: '1990',

    firstName: 'Usuario',
    lastName: 'Teste',

    company: Cypress.env('USER_COMPANY'),
    address1: Cypress.env('USER_ADDRESS1'),
    address2: Cypress.env('USER_ADDRESS2'),

    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',

    mobileNumber: Cypress.env('USER_MOBILE'),

    ...overrides,
  };

    /**
   * Converte o usuário do formato camelCase (usado na UI) para o
   * formato snake_case que a API espera.
   *
   * @returns {Object} Corpo pronto para enviar no `cy.request`.
   */
  user.toApiPayload = () => ({
    name: user.name,
    email: user.email,
    password: user.password,
    title: user.title,
    birth_date: user.birthDate,
    birth_month: user.birthMonth,
    birth_year: user.birthYear,
    firstname: user.firstName,
    lastname: user.lastName,
    company: user.company,
    address1: user.address1,
    address2: user.address2,
    country: user.country,
    zipcode: user.zipcode,
    state: user.state,
    city: user.city,
    mobile_number: user.mobileNumber,
  });

  return user;
}