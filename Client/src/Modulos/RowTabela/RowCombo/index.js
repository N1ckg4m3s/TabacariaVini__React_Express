
import "./Style.css"
function RowCombo(Props){
    const{Index,
        Value,
        Editando,
        NovoQuantos,
        SetNovoQuantos,
        FormaPagamento,
        SetEditando,
        SetRecarregarTela,
        RecarregarTela}=Props
    if(!Value.Produto){return null}
    console.log(Value.Produto.ItensSelecionaveis,"Liha numero 14")
    return(
        <tr key={Index}>
            <th className="TableIndex">{Index<9 ? `0${Index+1}` : Index+1}</th>
            <th className="TableItem" style={{flex:'13.5 1'}}>
                <h4>COMBO</h4>
                <ul>
                    {Value.Produto.ItensFixos.map((Item,index)=>
                        <li>1 | {Item.CLASSE} {Item.MARCA} : {Item.NOME}</li>
                    )}
                    {Value.Produto.ItensSelecionaveis.map((Item,index)=>
                        <li>1 | {Item.CLASSE} {Item.MARCA} : {Item.SELECIONADO}</li>
                    )}
                </ul>
            </th>
        </tr>
    )
}
export default RowCombo