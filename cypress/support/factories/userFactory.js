/**
 * Gera usuários com e-mail único por execução.
 *
 * O ambiente é público e o cadastro é real: e-mail fixo faria o cenário de
 * cadastro passar apenas na primeira execução e falhar em todas as seguintes.
 */
export function buildUser(overrides = {}) {
  const uniqueId = `${Date.now()}${Math.floor(Math.random() * 10000)}`;

  const user = {
    name: 'Usuario Teste',
    email: `qa.desafio.${uniqueId}@mailinator.com`,
    password: 'Teste@12345',
    title: 'Mr',
    birthDate: '10',
    birthMonth: 'May',
    birthYear: '1990',
    firstName: 'Usuario',
    lastName: 'Teste',
    company: 'Empresa Teste',
    address1: 'Rua das Flores, 100',
    address2: 'Apto 42',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '11999998888',
    ...overrides,
  };

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
