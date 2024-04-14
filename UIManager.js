class UIManager extends ProdutoManager
{
    constructor ()
    {
        super();
        this.modoEdicao = { ativo: false, index: null };  // Inicializando o estado de edição
        this.setupEventListeners();
    }

    /**
     * Configura os listeners de eventos para elementos do DOM.
     */
    setupEventListeners ()
    {
        // Listener para o formulário de registro de produtos
        document.getElementById( 'registration-form' ).addEventListener( 'submit', ( event ) => this.handleSubmit( event ) );

        // Listener para o botão de filtrar produtos por categoria
        document.getElementById( 'btn-filtrar' ).addEventListener( 'click', () => this.handleFiltrar() );
    }

    /**
     * Manipula o evento de filtro para atualizar a lista de produtos exibida.
     */
    handleFiltrar ()
    {
        const filtroCategoria = document.getElementById( 'filtro-categoria' ).value;
        this.atualizarTelaListagem( filtroCategoria );
    }

    /**
     * Atualiza a lista de produtos na tela com base no filtro de categoria.
     * @param {string} filtroCategoria - A categoria pela qual filtrar a lista de produtos.
     */
    atualizarTelaListagem ( filtroCategoria = '' )
    {
        const listaResultados = document.querySelector( '.list-results' );
        listaResultados.innerHTML = '';  // Limpa a lista atual antes de adicionar os novos itens filtrados

        const produtosFiltrados = this.produtos.filter( produto => filtroCategoria === '' || produto.categoria === filtroCategoria );
        produtosFiltrados.forEach( ( produto, index ) =>
        {
            this.adicionarProdutoNaTela( produto, index );
        } );
    }

    /**
     * Adiciona um produto à lista de produtos na tela.
     * @param {Produto} produto - O produto a ser adicionado à lista.
     * @param {number} index - O índice do produto na lista de produtos.
     */
    adicionarProdutoNaTela ( produto, index )
    {
        const itemDiv = document.createElement( 'div' );
        itemDiv.classList.add( 'item' );
        itemDiv.innerHTML = `<div class='item-details'><span>${ produto.nome }</span><span>${ produto.dataHora }</span><span>R$ ${ parseFloat( produto.valor ).toFixed( 2 ) }</span></div>`;

        const editButton = document.createElement( 'button' );
        editButton.textContent = 'Editar';
        editButton.onclick = () => this.prepararEdicao( index );

        const deleteButton = document.createElement( 'button' );
        deleteButton.textContent = 'Apagar';
        deleteButton.onclick = () =>
        {
            this.removerProduto( index );
            this.atualizarTelaListagem();
        };

        itemDiv.appendChild( editButton );
        itemDiv.appendChild( deleteButton );
        listaResultados.appendChild( itemDiv );
    }

    /**
     * Prepara a edição de um produto existente.
     * @param {number} index - O índice do produto a ser editado.
     */
    prepararEdicao ( index )
    {
        const produto = this.produtos[ index ];
        document.getElementById( 'nome-produto' ).value = produto.nome;
        document.getElementById( 'valor-produto' ).value = produto.valor;
        document.getElementById( 'categoria-produto' ).value = produto.categoria;
        document.getElementById( 'registration-form' ).querySelector( 'button[type="submit"]' ).textContent = 'Atualizar';
        this.modoEdicao = { ativo: true, index: index };
    }


    /**
     * Manipula a submissão do formulário para adicionar ou atualizar um produto.
     * @param {Event} event - O evento de submissão do formulário.
     */
    handleSubmit ( event )
    {
        event.preventDefault();
        const nome = document.getElementById( 'nome-produto' ).value.trim();
        const valor = parseFloat( document.getElementById( 'valor-produto' ).value.replace( ',', '.' ) );
        const categoria = document.getElementById( 'categoria-produto' ).value;
        const dataHora = new Date().toLocaleString( 'pt-BR', { timeZone: 'America/Sao_Paulo' } );
        const produto = new Produto( nome, valor, categoria, dataHora );

        if ( this.modoEdicao.ativo )
        {
            this.atualizarProduto( this.modoEdicao.index, produto );
            this.modoEdicao.ativo = false;  // Reset do modo de edição
        } else
        {
            this.adicionarProduto( produto );
        }

        document.getElementById( 'registration-form' ).reset();
        document.getElementById( 'registration-form' ).querySelector( 'button[type="submit"]' ).textContent = 'Cadastrar';
        this.atualizarTelaListagem();
    }


}