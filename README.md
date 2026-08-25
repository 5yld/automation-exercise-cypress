# Automação de Testes — automationexercise.com

Projeto de automação de testes cobrindo as camadas **Web (UI)** e **API** da
aplicação [automationexercise.com](https://automationexercise.com), estruturado
com **BDD (Gherkin)** e **Page Objects**.

---

## Stack

| Item | Escolha |
|---|---|
| Runner | Cypress 13 |
| BDD | `@badeball/cypress-cucumber-preprocessor` |
| Bundler | `@bahmutov/cypress-esbuild-preprocessor` + esbuild |
| Validação de schema | Ajv (JSON Schema draft-07) |
| Linguagem | JavaScript |

### Por que Cypress

A integração com Cucumber via `@badeball/cypress-cucumber-preprocessor` é
madura e exige pouca configuração, o que reduz a superfície de erro dentro do
prazo do desafio. A captura de evidência em falha é comportamento nativo do
runner, e `cy.request()` cobre a camada de API dentro do mesmo projeto, sem
ferramenta externa.

Playwright foi considerado: oferece espera automática mais robusta e melhor
paralelismo, mas a integração com Cucumber exige camada de ligação manual
entre o runner do Cucumber e o contexto do browser. A escolha priorizou
previsibilidade de entrega sobre esses ganhos.

### Por que JavaScript

TypeScript agregaria segurança de tipos, mas não é requisito do desafio e
adicionaria configuração de build sem benefício proporcional no escopo atual.

---

## Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior

## Instalação

```bash
git clone <url-do-repositorio>
cd <pasta-do-repositorio>
npm install
```

O download do binário do Cypress ocorre na primeira instalação e pode levar
alguns minutos.

## Execução

```bash
npm test              # executa toda a suíte em modo headless
npm run cy:open       # abre a interface interativa do Cypress
npm run test:web      # apenas a camada Web (.feature)
npm run test:api      # apenas a camada API
npm run test:smoke    # apenas cenários marcados com @smoke
npm run test:regression
```

Filtro por tag arbitrária:

```bash
npx cypress run --env tags="@carrinho or @checkout"
```

---

## Estrutura

```
cypress/
├── e2e/
│   ├── api/                    # testes da camada API (Mocha)
│   ├── features/               # arquivos .feature em Gherkin
│   └── step_definitions/       # implementação dos steps
├── fixtures/
│   ├── schemas/                # JSON Schemas para validação de contrato
│   └── paymentCard.json
└── support/
    ├── factories/              # geradores de massa de teste
    ├── pages/                  # Page Objects
    ├── commands.js             # comandos customizados
    ├── validateSchema.js
    └── e2e.js
cypress.config.js
```

### Divisão de responsabilidade

| Camada | Responsabilidade |
|---|---|
| `.feature` | O que é testado, em linguagem de negócio |
| `step_definitions` | Tradução da frase do Gherkin em chamadas ao Page Object |
| `pages` | Locators e ações de cada página |

Step definitions não acessam elementos diretamente. Todo `cy.get()` de
interface está contido em um Page Object.

---

## Cobertura

### Camada Web

| ID | Caso | Arquivo |
|---|---|---|
| W01 | Cadastro de usuário | `cadastro.feature` |
| W02 | Login com credenciais válidas | `login.feature` |
| W03 | Login com credenciais inválidas | `login.feature` |
| W04 | Busca de produto | `produtos.feature` |
| W05 | Adicionar produto ao carrinho | `carrinho.feature` |
| W06 | Fluxo de checkout E2E | `checkout.feature` |
| W07 | Remover produto do carrinho | `carrinho.feature` |
| W08 | Validação de campo obrigatório | `cadastro.feature` |
| W09 | Navegação por categoria | `produtos.feature` |
| W10 | Scenario Outline com Examples | `produtos.feature` |
| W11 | Tags para organização e filtro | todas as features |
| W12 | Evidência automática em falha | `cypress.config.js` |

### Camada API

| ID | Endpoint | Arquivo |
|---|---|---|
| A01 | `GET /productsList` | `api/produtos.cy.js` |
| A02 | `GET /brandsList` | `api/produtos.cy.js` |
| A03 | `POST /searchProduct` — válido | `api/produtos.cy.js` |
| A04 | `POST /searchProduct` — sem parâmetro | `api/produtos.cy.js` |
| A05 | `POST /createAccount` | `api/account.cy.js` |
| A06 | `POST /verifyLogin` — válido | `api/account.cy.js` |
| A07 | `POST /verifyLogin` — inválido | `api/account.cy.js` |
| A08 | `DELETE /deleteAccount` | `api/account.cy.js` |
| A09 | `PUT /updateAccount` | `api/account.cy.js` |
| A10 | Validação de schema | `api/produtos.cy.js` |

---

## Decisões técnicas e interpretações

Conforme a seção 9 do desafio, as interpretações adotadas diante de pontos
ambíguos estão registradas abaixo.

### 1. A API responde HTTP 200 mesmo em erro

O comportamento de todos os endpoints foi medido antes da escrita dos testes.
A API retorna **sempre** HTTP 200 — inclusive em parâmetro ausente, credencial
inválida e método não suportado. O código real é entregue no campo
`responseCode` do corpo da resposta:

| Situação | HTTP | `responseCode` |
|---|---|---|
| Consulta bem-sucedida | 200 | 200 |
| Conta criada | 200 | 201 |
| Parâmetro obrigatório ausente | 200 | 400 |
| Usuário inexistente | 200 | 404 |
| Método não suportado | 200 | 405 |

Os testes negativos validam o status de transporte e o código de negócio como
duas dimensões distintas, refletindo o comportamento real.

Além disso, as respostas são servidas com `Content-Type: text/html`, o que
impede o parse automático do JSON pelo Cypress. Ambos os contornos estão
centralizados no comando `cy.api()` (`support/commands.js`), mantendo os
testes livres desse detalhe de infraestrutura.

### 2. Testes de API não usam Gherkin

Permitido pela seção 7 do desafio. Gherkin existe para tornar o requisito
legível por quem não programa; testes de contrato de API não têm essa
audiência, e a cerimônia não traria ganho de comunicação. Cada camada usa a
ferramenta adequada ao seu propósito.

### 3. Idioma: Gherkin em português, código em inglês

Os arquivos `.feature` são documentação de negócio e acompanham o idioma do
time. O código segue a convenção da linguagem.

### 4. Massa de teste com e-mail dinâmico

O ambiente é compartilhado e o cadastro é persistente. E-mail fixo faria o
cenário de cadastro passar apenas na primeira execução. O gerador em
`support/factories/userFactory.js` produz um e-mail único por execução,
tornando a suíte idempotente.

### 5. Preparação de estado pela API

Cenários cujo objetivo não é o cadastro criam o usuário via API
(`cy.createUserViaApi`). Isso reduz o tempo de execução e evita que um defeito
no cadastro reprove o cenário de login, apontando a falha para a
funcionalidade errada. O caso W01 é a exceção: cadastra pela interface, porque
é exatamente o que ele testa.

### 6. Busca considera nome, marca e categoria

A busca da aplicação não se limita ao nome do produto: buscar `top` retorna
itens como *Little Girls Mr. Panda Shirt*, que pertence à categoria *Tops*.
Validar apenas o nome exibido geraria falso negativo.

A verificação adotada compara a listagem apresentada na interface com o
conjunto retornado por `POST /searchProduct` para o mesmo termo, confirmando
que a UI apresenta exatamente o resultado esperado pelo backend.

### 7. Validação de campo obrigatório via HTML5

O formulário de cadastro usa validação nativa do navegador, que não insere
mensagem no DOM. A verificação usa a Constraint Validation API
(`checkValidity()` e `validationMessage`) do próprio campo.

### 8. Bloqueio de domínios de publicidade

A aplicação carrega anúncios em iframe que se sobrepõem a elementos e
interceptam cliques, causando intermitência. Os domínios estão bloqueados via
`blockHosts` no `cypress.config.js`. O filtro de `uncaught:exception` em
`support/e2e.js` ignora apenas erros originados desses scripts — exceções da
aplicação continuam reprovando o teste.

### 9. Política de retentativas

`retries: { runMode: 2 }` está habilitado para absorver instabilidade de rede
do ambiente público. Não substitui a correção de teste instável: é uma medida
para o ambiente, não para o código de teste.

---

## Evidências

Em caso de falha, o Cypress gera automaticamente:

- **Screenshot** em `cypress/screenshots/`
- **Vídeo** da execução em `cypress/videos/`

Ambos os diretórios estão no `.gitignore` por serem artefatos de execução.
