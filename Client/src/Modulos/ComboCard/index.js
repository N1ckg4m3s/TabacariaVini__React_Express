import "./Style.css"

import { ReactComponent as Certo} from "./Imagens/Certo.svg"
import { ReactComponent as Errado} from "./Imagens/Remover.svg"

function ComboCard(){
    return(
        <div className="ComboCard-Tudo">
            <div className="ComboCard-Header">
                <span className="R"></span>
                <span className="L"></span>
                <span className="C"></span>
                <h3 className="ComboCard-Valor">120$</h3>
                <h4>NOME</h4>
            </div>
            <div className="ComboCard-Body">
                <li> <Certo className="List-Possui"/> Tem isso </li>
                <li> <Errado className="List-NaoPossui"/> Não Tem isso </li>
                <li> <Certo className="List-Possui"/> Tem isso </li>
                <li> <Errado className="List-NaoPossui"/> Não Tem isso </li>
            </div>
            <button className="ComboCard-Button">Compra</button>
        </div>
    )
}
export default ComboCard