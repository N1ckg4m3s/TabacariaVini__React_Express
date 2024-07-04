import "./Style.css"
import { ReactComponent as Seta } from './Imagens/SetaBaixo.svg';
import { useState } from "react";
function DropList(Props){
    const[Aberto,SetAberto]=useState(false)
    return(
        <article className="ArticleDropList">
            <button className="BotaoDropList"
               onClick={()=>SetAberto(!Aberto)}
            >
                PROMOÇÃO
                <Seta
                    className="SVG-white"
                    style={Aberto ? { transform: 'rotate(180deg)' } : {}}
                />
            </button>
            {Aberto&&
                <div>
                    <ul>
                        <h5>TITULO:</h5>
                        <li>NONE</li>
                        <li>NONE</li>
                    </ul>
                    <h5>FIXO: ITEM </h5>
                    <h5>FIXO: ITEM </h5>
                </div>
            }
        </article>
    )
}
export default DropList