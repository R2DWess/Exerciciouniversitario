import GastoManager from './GastoManager.js';
import Gasto from './Gasto.js';

class UIManager extends GastoManager
{
    constructor ()
    {
        super();
        this.modoEdicao = { ativo: false, index: null };
        this.setupEventListeners();
    }

    setupEventListeners ()
    {
        document.getElementById( 'registration-form' ).addEventListener( 'submit', ( event ) => this.handleSubmit( event ) );
        document.getElementById( 'btn-filtrar' ).addEventListener( 'click', () => this.handleFiltrar() );
        document.getElementById( 'btn-buscar' ).addEventListener( 'click', () => this.handleBuscar() );
    }

    handleSubmit ( event )
    {
        event.preventDefault();
        const nome = document.getElementById( 'nome-gasto' ).value.trim();
        const valor = parseFloat( document.getElementById( 'valor-gasto' ).value.replace( ',', '.' ) );
        const categoria = document.getElementById( 'categoria-gasto' ).value;
        const dataHora = new Date().toLocaleString( 'pt-BR', { timeZone: 'America/Sao_Paulo' } );
        const gasto = new Gasto( nome, valor, categoria, dataHora );

        if ( this.modoEdicao.ativo )
        {
            this.atualizarGasto( this.modoEdicao.index, gasto );
            this.modoEdicao.ativo = false;
        } else
        {
            this.adicionarGasto( gasto );
        }

        document.getElementById( 'registration-form' ).reset();
        document.getElementById( 'registration-form' ).querySelector( 'button[type="submit"]' ).textContent = 'Cadastrar';
        this.atualizarTelaListagem();
    }

    handleFiltrar ()
    {
        const filtroCategoria = document.getElementById( 'filtro-categoria' ).value;
        this.atualizarTelaListagem( filtroCategoria );
    }

    handleBuscar ()
    {
        const buscaTermo = document.getElementById( 'busca-termo' ).value.toLowerCase();
        const buscaTipo = document.getElementById( 'busca-tipo' ).value;
        const filtrados = this.gastos.filter( gasto => buscaTipo === "nome" ? gasto.nome.toLowerCase().includes( buscaTermo ) : gasto.valor.toString() === buscaTermo );
        this.atualizarTelaListagem( '', filtrados );
    }

    atualizarTelaListagem ( filtroCategoria = '', gastosFiltrados = null )
    {
        const listaResultados = document.querySelector( '.list-results' );
        listaResultados.innerHTML = '';
        const gastosParaMostrar = gastosFiltrados || this.gastos.filter( gasto => filtroCategoria === '' || gasto.categoria === filtroCategoria );

        gastosParaMostrar.forEach( ( gasto, index ) =>
        {
            this.adicionarGastoNaTela( gasto, index );
        } );
    }

    adicionarGastoNaTela ( gasto, index )
    {
        const listaResultados = document.querySelector( '.list-results' );
        const itemDiv = document.createElement( 'div' );
        itemDiv.classList.add( 'item' );
        itemDiv.innerHTML = `<div class='item-details'>
            <span>${ gasto.nome }</span>
            <span>${ gasto.dataHora }</span>
            <span>R$ ${ parseFloat( gasto.valor ).toFixed( 2 ) }</span>
        </div>`;
        const editButton = document.createElement( 'button' );
        editButton.textContent = 'Editar';
        editButton.onclick = () => this.prepararEdicao( index );
        const deleteButton = document.createElement( 'button' );
        deleteButton.textContent = 'Apagar';
        deleteButton.onclick = () =>
        {
            this.removerGasto( index );
            this.atualizarTelaListagem();
        };
        itemDiv.appendChild( editButton );
        itemDiv.appendChild( deleteButton );
        listaResultados.appendChild( itemDiv );
    }

    prepararEdicao ( index )
    {
        const gasto = this.gastos[ index ];
        document.getElementById( 'nome-gasto' ).value = gasto.nome;
        document.getElementById( 'valor-gasto' ).value = gasto.valor;
        document.getElementById( 'categoria-gasto' ).value = gasto.categoria;
        document.getElementById( 'registration-form' ).querySelector( 'button[type="submit"]' ).textContent = 'Atualizar';
        this.modoEdicao = { ativo: true, index: index };
    }
}
export default UIManager;
