// IMAGEN //
import ImgVazio from "./Imagens/ImagemExVazia.png"

import { Link } from "react-router-dom"

import "./Style.css"
function SmallItemCard(Props){
    return(
        <Link to={`/Descricao?${Props.Objeto.ID}`} className="SmallItemCard">
            {Props.MostrarMarca &&
                <div>{Props.Objeto.Marca}</div>
            }
            <img src={Props.Objeto.Imagem!==""?Props.Objeto.Imagem:ImgVazio} alt=""></img>
            <div>{Props.Objeto.Cor || Props.Objeto.Nome}</div>
        </Link>
    )
}
export default SmallItemCard