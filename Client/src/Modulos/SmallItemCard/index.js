// IMAGEN //
import ImgVazio from "./Imagens/ImagemExVazia.png"

import { Link } from "react-router-dom"

import "./Style.css"
function SmallItemCard(Props){

    const EfetuarClick=(e)=>{
        if(Props.CustonFunction){
            e.preventDefault()
            Props.CustonFunction()
        }
    }

    return(
        <Link to={`/Descricao?${Props.Objeto.ID}`} className="SmallItemCard" onClick={EfetuarClick}>
            {Props.MostrarMarca &&
                <div>{Props.Objeto.Marca}</div>
            }
            <img src={Props.Objeto.Imagem!==""?`http://localhost:5000/${Props.Objeto.Imagem}` : ImgVazio} alt=""></img>
            <div>{Props.Objeto.Cor || Props.Objeto.Nome}</div>
        </Link>
    )
}
export default SmallItemCard