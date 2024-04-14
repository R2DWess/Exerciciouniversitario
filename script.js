let produtosCadastrados = [];

document.addEventListener( 'DOMContentLoaded', () =>
{
    document.getElementById( 'registration-form' ).addEventListener( 'submit', submitFormOriginal );
    document.getElementById( 'btn-filtrar' ).addEventListener( 'click', function ()
    {
        const filtroCategoria = document.getElementById( 'filtro-categoria' ).value;
        atualizarTelaListagem( filtroCategoria );
    } );
} );

function atualizarTelaListagem ( filtroCategoria = '' )
{
    const listaResultados = document.querySelector( '.list-results' );
    listaResultados.innerHTML = '';

    const produtosFiltrados = produtosCadastrados.filter( produto => filtroCategoria === '' || produto.categoria === filtroCategoria );
    produtosFiltrados.forEach( ( produto, index ) =>
    {
        const itemDiv = document.createElement( 'div' );
        itemDiv.classList.add( 'item' );

        const detailsSpan = document.createElement( 'div' );
        detailsSpan.classList.add( 'item-details' );
        detailsSpan.innerHTML = `<span>${ produto.nome }</span><span>${ produto.dataHora }</span><span>R$ ${ parseFloat( produto.valor ).toFixed( 2 ) }</span>`;

        const editButton = document.createElement( 'button' );
        editButton.textContent = 'Editar';
        editButton.onclick = () => editarGasto( index );

        const deleteButton = document.createElement( 'button' );
        deleteButton.textContent = 'Apagar';
        deleteButton.onclick = () => apagarGasto( index );

        itemDiv.appendChild( detailsSpan );
        itemDiv.appendChild( editButton );
        itemDiv.appendChild( deleteButton );

        listaResultados.appendChild( itemDiv );
    } );
}

function apagarGasto ( index )
{
    produtosCadastrados.splice( index, 1 );
    atualizarTelaListagem();
}

function editarGasto ( index )
{
    const produto = produtosCadastrados[ index ];
    document.getElementById( 'nome-produto' ).value = produto.nome;
    document.getElementById( 'valor-produto' ).value = produto.valor;
    document.getElementById( 'categoria-produto' ).value = produto.categoria;

    const submitButton = document.querySelector( '#registration-form button[type="submit"]' );
    submitButton.textContent = 'Atualizar';
    const form = document.getElementById( 'registration-form' );
    form.onsubmit = function ( event )
    {
        event.preventDefault();
        atualizarGasto( index );
    };
}

function atualizarGasto ( index )
{
    const nomeProduto = document.getElementById( 'nome-produto' ).value.trim();
    const valorProduto = document.getElementById( 'valor-produto' ).value.trim();
    const valorNumerico = Number( valorProduto.replace( ',', '.' ) );

    if ( isNaN( valorNumerico ) )
    {
        alert( "Por favor, insira um valor numérico válido." );
        return;
    }

    const categoriaProduto = document.getElementById( 'categoria-produto' ).value;
    const dataHora = new Date().toLocaleString( 'pt-BR', { timeZone: 'America/Sao_Paulo' } );
    produtosCadastrados[ index ] = {
        nome: nomeProduto,
        valor: valorNumerico, // Armazenar como número para facilitar cálculos futuros
        categoria: categoriaProduto,
        dataHora: dataHora
    };

    document.getElementById( 'registration-form' ).reset();
    document.querySelector( '#registration-form button[type="submit"]' ).textContent = 'Cadastrar';
    document.getElementById( 'registration-form' ).onsubmit = submitFormOriginal;
    atualizarTelaListagem();
}

function submitFormOriginal ( event )
{
    event.preventDefault();
    const nomeProduto = document.getElementById( 'nome-produto' ).value.trim();
    const valorProduto = document.getElementById( 'valor-produto' ).value.trim();
    const valorNumerico = Number( valorProduto.replace( ',', '.' ) );

    if ( isNaN( valorNumerico ) )
    {
        alert( "Por favor, insira um valor numérico válido." );
        return;
    }

    const categoriaProduto = document.getElementById( 'categoria-produto' ).value;
    const dataHora = new Date().toLocaleString( 'pt-BR', { timeZone: 'America/Sao_Paulo' } );

    const novoProduto = {
        nome: nomeProduto,
        valor: valorNumerico, // Armazenar como número para facilitar cálculos futuros
        categoria: categoriaProduto,
        dataHora: dataHora
    };

    produtosCadastrados.push( novoProduto );
    document.getElementById( 'registration-form' ).reset();
    atualizarTelaListagem();
}
