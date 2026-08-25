# language: pt
@login
Funcionalidade: Autenticação de usuário
  Como um cliente cadastrado na loja
  Quero acessar minha conta com e-mail e senha
  Para acompanhar meus pedidos e finalizar compras

  Contexto:
    Dado que estou na página de login

  @smoke @regression
  Cenário: W02 - Login com credenciais válidas
    Dado que existe uma conta cadastrada
    Quando informo o e-mail e a senha corretos
    Então devo estar autenticado no site

  @regression
  Cenário: W03 - Login com senha incorreta
    Dado que existe uma conta cadastrada
    Quando informo o e-mail correto e uma senha inválida
    Então devo ver a mensagem "Your email or password is incorrect!"
    E não devo estar autenticado no site
