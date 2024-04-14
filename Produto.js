class Produto
{
    /**
     * Construtor da classe Produto.
     * @param {string} nome - O nome do produto.
     * @param {number} valor - O valor do produto.
     * @param {string} categoria - A categoria do produto.
     * @param {string} dataHora - A data e hora da criação ou atualização do produto.
     */
    constructor ( nome, valor, categoria, dataHora )
    {
        this.nome = nome;
        this.valor = valor;
        this.categoria = categoria;
        this.dataHora = dataHora;
    }
}
