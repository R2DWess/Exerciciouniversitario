import Gasto from './Gasto.js';

class GastoManager
{
    constructor ()
    {
        this.gastos = [];
    }

    adicionarGasto ( gasto )
    {
        this.gastos.push( gasto );
    }

    removerGasto ( index )
    {
        if ( index >= 0 && index < this.gastos.length )
        {
            this.gastos.splice( index, 1 );
        }
    }

    atualizarGasto ( index, gastoAtualizado )
    {
        if ( index >= 0 && index < this.gastos.length )
        {
            this.gastos[ index ] = gastoAtualizado;
        }
    }

    getGastos ()
    {
        return this.gastos;
    }
}
export default GastoManager;
