import { buildUser } from '../../support/factories/userFactory';

describe('API - Conta de usuário', () => {
  context('A05 - POST /createAccount', () => {
    it('@smoke @regression cria uma conta com dados válidos', () => {
      const user = buildUser();

      cy.api('POST', 'createAccount', { body: user.toApiPayload() }).then(
        ({ data }) => {
          expect(data.responseCode).to.eq(201);
          expect(data.message).to.eq('User created!');
        }
      );

      cy.api('GET', 'getUserDetailByEmail', {
        qs: { email: user.email },
      }).then(({ data }) => {
        expect(data.responseCode, 'conta deve existir após a criação').to.eq(200);
        expect(data.user.email).to.eq(user.email);
      });
    });
  });

  context('A06 - POST /verifyLogin com credenciais válidas', () => {
    it('@smoke @regression autentica o usuário cadastrado', () => {
      const user = buildUser();

      cy.createUserViaApi(user);
      cy.api('POST', 'verifyLogin', {
        body: { email: user.email, password: user.password },
      }).then(({ data }) => {
        expect(data.responseCode).to.eq(200);
        expect(data.message).to.eq('User exists!');
      });
    });
  });

  // A API retorna HTTP 200 por padrão e encapsula o erro real de negócio (404) dentro do payload.
  context('A07 - POST /verifyLogin com credenciais inválidas', () => {
    it('@regression não autentica e informa 404 no corpo', () => {
      cy.api('POST', 'verifyLogin', {
        body: { email: 'inexistente.qa@nada.com', password: 'SenhaErrada123' },
      }).then((response) => {
        expect(response.status, 'status HTTP').to.eq(200);
        expect(response.data.responseCode, 'código no corpo').to.eq(404);
        expect(response.data.message).to.eq('User not found!');
      });
    });

    it('@regression rejeita requisição sem o parâmetro password', () => {
      cy.api('POST', 'verifyLogin', {
        body: { email: 'inexistente.qa@nada.com' },
      }).then(({ data }) => {
        expect(data.responseCode).to.eq(400);
        expect(data.message).to.eq(
          'Bad request, email or password parameter is missing in POST request.'
        );
      });
    });
  });

  context('A09 - PUT /updateAccount', () => {
    it('@regression atualiza os dados da conta', () => {
      const user = buildUser();

      cy.createUserViaApi(user);
      cy.api('PUT', 'updateAccount', {
        body: { ...user.toApiPayload(), firstname: 'NomeAtualizado' },
      }).then(({ data }) => {
        expect(data.responseCode).to.eq(200);
        expect(data.message).to.eq('User updated!');
      });

      cy.api('GET', 'getUserDetailByEmail', { qs: { email: user.email } }).then(
        ({ data }) => {
          expect(data.user.first_name, 'alteração deve ter sido persistida').to.eq(
            'NomeAtualizado'
          );
        }
      );
    });
  });

  context('A08 - DELETE /deleteAccount', () => {
    it('@regression remove a conta e ela deixa de autenticar', () => {
      const user = buildUser();

      cy.createUserViaApi(user);
      cy.api('DELETE', 'deleteAccount', {
        body: { email: user.email, password: user.password },
      }).then(({ data }) => {
        expect(data.responseCode).to.eq(200);
        expect(data.message).to.eq('Account deleted!');
      });

      // Valida o efeito da operação, não apenas a resposta.
      cy.api('POST', 'verifyLogin', {
        body: { email: user.email, password: user.password },
      }).then(({ data }) => {
        expect(data.responseCode, 'conta removida não deve autenticar').to.eq(404);
      });
    });
  });
});
