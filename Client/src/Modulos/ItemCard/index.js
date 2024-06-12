import ImgVazio from "./Imagens/ImagemExVazia.png"
import { Link } from "react-router-dom"
import "./Style.css"

function ItemCard(Props){
    return (
        <Link to={`/Descricao?${Props.Objeto.ID}`} className="ItemCard">
            <div className="ItemCardMarca">{Props.Objeto.Marca}</div>
            <img src={Props.Objeto.Imagem === "" ? ImgVazio : Props.Objeto.Imagem} alt="" />
            <div className="ItemCardValor">$ <span>{Props.Objeto.Valor.DinPix}</span></div>
        </Link>
    );
}

export default ItemCard;
