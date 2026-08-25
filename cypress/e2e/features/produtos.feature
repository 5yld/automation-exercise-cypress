# language: pt
@produtos
Funcionalidade: Busca e navegação de produtos
  Como um cliente da loja
  Quero localizar produtos por busca ou categoria
  Para encontrar o que pretendo comprar

  Contexto:
    Dado que estou na página de produtos

  @smoke @regression
  Cenário: W04 - Busca por termo existente
    Quando busco pelo termo "top"
    Então devo ver apenas produtos relacionados a "top"

  @regression
  Esquema do Cenário: W10 - Busca por diferentes termos
    Quando busco pelo termo "<termo>"
    Então devo ver apenas produtos relacionados a "<termo>"

    Exemplos:
      | termo   |
      | top     |
      | dress   |
      | tshirt  |

  @regression
  Cenário: W09 - Navegação por categoria
    Quando acesso a categoria "Dress" do grupo "Women"
    Então devo ver a listagem da categoria "Women - Dress Products"
