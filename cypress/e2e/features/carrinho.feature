# language: pt
@carrinho
Funcionalidade: Carrinho de compras
  Como um cliente da loja
  Quero adicionar e remover produtos do carrinho
  Para revisar o pedido antes de finalizar a compra

  Contexto:
    Dado que estou na página de produtos

  @smoke @regression
  Cenário: W05 - Adicionar produto ao carrinho
    Quando adiciono ao carrinho o produto 1
    E acesso o carrinho
    Então o produto "Blue Top" deve estar no carrinho
    E a quantidade do produto deve ser 1

  @regression
  Cenário: W07 - Remover produto do carrinho
    Dado que adicionei ao carrinho o produto 1
    E acesso o carrinho
    Quando removo o produto do carrinho
    Então o carrinho deve estar vazio
