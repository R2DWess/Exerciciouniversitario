class ProdutoManager
{
    constructor ()
    {
        this.produtos = [];
    }

    /**
     * Adiciona um produto à lista de produtos.
     * @param {Produto} produto - O produto a ser adicionado.
     */
    adicionarProduto ( produto )
    {
        this.produtos.push( produto );
    }

    /**
     * Remove um produto da lista pelo índice.
     * @param {number} index - O índice do produto a ser removido.
     */
    removerProduto ( index )
    {
        if ( index >= 0 && index < this.produtos.length )
        {
            this.produtos.splice( index, 1 );
        }
    }

    /**
     * Atualiza um produto na lista pelo índice.
     * @param {number} index - O índice do produto a ser atualizado.
     * @param {Produto} produtoAtualizado - O novo produto para substituir o antigo.
     */
    atualizarProduto ( index, produtoAtualizado )
    {
        if ( index >= 0 && index < this.produtos.length )
        {
            this.produtos[ index ] = produtoAtualizado;
        }
    }

    /**
     * Retorna todos os produtos.
     * @return {Array<Produto>} A lista de produtos.
     */
    getProdutos ()
    {
        return this.produtos;
    }
}
