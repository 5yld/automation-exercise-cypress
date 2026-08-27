# language: pt
@cadastro
Funcionalidade: Cadastro de usuário
  Como um visitante da loja
  Quero criar uma conta
  Para comprar produtos e acompanhar meus pedidos

  @smoke @regression
  Cenário: W01 - Cadastro com dados válidos
    Dado que estou na página de login
    Quando inicio o cadastro com um nome e e-mail novos
    E preencho os dados da conta e do endereço
    Então minha conta deve ser criada com sucesso
    E devo estar autenticado no site

  @regression
  Cenário: W01 - Cadastro com e-mail já utilizado
    Dado que existe uma conta cadastrada
    E que estou na página de login
    Quando inicio o cadastro com o e-mail de uma conta existente
    Então devo ver a mensagem "Email Address already exist!"
    
  @regression
  Cenário: W08 - Cadastro sem preencher a senha
    Dado que estou na página de login
    Quando inicio o cadastro com um nome e e-mail novos
    E submeto o formulário sem preencher a senha
    Então o campo de senha deve impedir o envio do formulário
