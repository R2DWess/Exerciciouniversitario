// Array para armazenar os produtos cadastrados
let produtosCadastrados = [];

document.addEventListener( 'DOMContentLoaded', () =>
{
    // Configura o evento de submit do formulário de cadastro
    document.getElementById( 'registration-form' ).addEventListener( 'submit', function ( event )
    {
        event.preventDefault();

        const nomeProduto = document.getElementById( 'nome-produto' ).value.trim();
        const valorProduto = document.getElementById( 'valor-produto' ).value.trim();
        const categoriaProduto = document.getElementById( 'categoria-produto' ).value;
        const dataHora = new Date().toLocaleString( 'pt-BR', { timeZone: 'America/Sao_Paulo' } );

        const novoProduto = {
            nome: nomeProduto,
            valor: valorProduto,
            categoria: categoriaProduto,
            dataHora: dataHora
        };

        produtosCadastrados.push( novoProduto );
        atualizarTelaListagem();  // Atualiza a listagem sem filtro ao adicionar novo item
        this.reset();  // Limpa o formulário após o cadastro
    } );

    // Configura o evento de clique do botão de filtrar
    document.getElementById( 'btn-filtrar' ).addEventListener( 'click', function ()
    {
        const filtroCategoria = document.getElementById( 'filtro-categoria' ).value;
        atualizarTelaListagem( filtroCategoria );  // Chama a função de listagem com filtro
    } );
} );

// Função para atualizar a tela de listagem com opção de filtro por categoria
function atualizarTelaListagem ( filtroCategoria = '' )
{
    const listaResultados = document.querySelector( '.list-results' );
    listaResultados.innerHTML = '';  // Limpa a lista de resultados

    // Filtra os produtos com base na categoria selecionada
    const produtosFiltrados = produtosCadastrados.filter( produto =>
    {
        return filtroCategoria === '' || produto.categoria === filtroCategoria;
    } );

    // Cria e adiciona os elementos de produto filtrados ao DOM
    produtosFiltrados.forEach( produto =>
    {
        const itemDiv = document.createElement( 'div' );
        itemDiv.classList.add( 'item' );
        itemDiv.innerHTML = `
            <span>${ produto.nome } | ${ produto.dataHora }</span>
            <span>R$ ${ produto.valor }</span>
        `;
        listaResultados.appendChild( itemDiv );
    } );
}
