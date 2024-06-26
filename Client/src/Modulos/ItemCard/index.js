import ImgVazio from "./Imagens/ImagemExVazia.png"
import { Link } from "react-router-dom"
import "./Style.css"

function ItemCard(Props){
    if(Props.Objeto===undefined){return}
    return(
        <Link to={`/Descricao?${Props.Objeto.ID}`} className="ItemCard">
            <div className="ItemCardMarca">{Props.Objeto.Marca}</div>
            <img src={Props.Objeto.Imagem === "" ? ImgVazio : `http://localhost:5000/${Props.Objeto.Imagem}`} alt="" />
            <div className="ItemCardValor">$ <span>{Props.Objeto.Valor.DinPix}</span></div>
        </Link>
    );
}

export default ItemCard;
