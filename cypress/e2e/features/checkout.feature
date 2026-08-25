# language: pt
@checkout
Funcionalidade: Finalização de compra
  Como um cliente autenticado
  Quero concluir a compra dos produtos do meu carrinho
  Para receber os itens que selecionei

  @smoke @regression
  Cenário: W06 - Fluxo completo de compra
    Dado que existe uma conta cadastrada
    E que estou autenticado no site
    Quando adiciono ao carrinho o produto 1
    E acesso o carrinho
    E avanço para o checkout
    Então devo ver meu endereço de entrega e o resumo do pedido
    Quando informo os dados do cartão e confirmo o pagamento
    Então devo ver a confirmação do pedido
