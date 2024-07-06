
import "./Style.css"

import { ReactComponent as Edit } from "../Imagens/Edit.svg";
import { ReactComponent as Remov } from "../Imagens/Remover.svg";
import { ReactComponent as Certo } from "../Imagens/Certo.svg";
import CarrinhoControlerInstance from "../../../Controle/CarrinhoControler";

function RowSimples(props){
    const{Index,
        Value,
        Editando,
        NovoQuantos,
        SetNovoQuantos,
        FormaPagamento,
        SetEditando,
        SetRecarregarTela,
        RecarregarTela}=props

    return (
    <tr key={Index}>
        <th className="TableIndex">{Index<9 ? `0${Index+1}` : Index+1}</th>
        <th className="TableItem"> {`${Value.Produto.Especificacao || Value.Produto.Marca}: 
        ${
            (Value.Produto.Nome ||
            Value.Produto.Cor
            )}`} </th>
        <th className="TableQntVal">
            {Editando===Index?
                <input
                    type="Number"
                    value={NovoQuantos}
                    onChange={(Tgt)=>SetNovoQuantos(Tgt.target.value)}/>
                :Value.Quantidade
            }
        </th>
        <th className="TableQntVal">
            {(
                Value.Produto.Valor.DinPix!==Value.Produto.Valor.Cart?
                    FormaPagamento===""? "##,##" :
                        (FormaPagamento==="Pix"||FormaPagamento==="Dim")? Value.Produto.Valor.DinPix*(Editando!==-1?Value.Quantidade:NovoQuantos):
                        FormaPagamento==="Cart"? Value.Produto.Valor.Cart*(Editando!==-1?Value.Quantidade:NovoQuantos):0:
                Value.Produto.Valor.DinPix*(Editando!==-1?NovoQuantos:Value.Quantidade)
            )
            }
        </th>
        {
            Editando===Index?
            <th className="TableQntVal">
                <button className="AceitarTroca-Item"
                    onClick={async()=>{
                        await CarrinhoControlerInstance.Atualizar(Index,NovoQuantos)
                        SetEditando(-1)
                    }}>
                    <Certo className="SVG-green"/>
                </button>
            </th>:
            <th className="TableQntVal">
                <button className="Edit-Item"
                    onClick={async()=>{
                        await SetNovoQuantos(Value.Quantidade)
                        SetEditando(Index)
                    }}
                ><Edit className="SVG-blue"/></button>
                <button className="Delete-Item"
                    onClick={async()=>{
                        await CarrinhoControlerInstance.Remover(Index)
                        SetRecarregarTela(!RecarregarTela)
                    }}
                ><Remov className="SVG-red"/></button>
            </th>
        }
    </tr>
    )
}
export default RowSimples