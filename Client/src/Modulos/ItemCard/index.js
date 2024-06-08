import ImgVazio from "./Imagens/ImagemExVazia.png"
import { Link } from "react-router-dom"
import "./Style.css"

function ItemCard(Props){
    const ValorNoCard=Props.Objeto.Preco.DinPix || Props.Objeto.Preco
    return (
        <Link to={`/Descricao?${Props.Objeto.constructor.name}&${Props.Objeto.Id}`} className="ItemCard">
            <div className="ItemCardMarca">{Props.Objeto.Marca}</div>
            <img src={Props.Objeto.Imagem === "" ? ImgVazio : Props.Objeto.Imagem} alt="" />
            <div className="ItemCardValor">$ <span>{ValorNoCard}</span></div>
        </Link>
    );
}

export default ItemCard;
