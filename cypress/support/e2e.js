import './commands';

/**
 * Scripts de terceiros (anúncios) disparam exceções não tratadas que não têm
 * relação com a aplicação. Sem este filtro, cenários válidos reprovariam.
 * Erros originados da aplicação continuam falhando o teste.
 */
Cypress.on('uncaught:exception', (err) => {
  const thirdPartyNoise = ['ResizeObserver loop', 'adsbygoogle', 'Script error'];
  return !thirdPartyNoise.some((noise) => err.message.includes(noise));
});
