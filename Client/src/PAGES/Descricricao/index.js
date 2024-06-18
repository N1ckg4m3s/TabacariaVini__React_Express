// COMPONENTES IMPORTADOS //
import { useLocation } from "react-router-dom"
import FooterBar from "../../Modulos/FooterBar/Index"
import SmallItemCard from "../../Modulos/SmallItemCard"
import TopBar from "../../Modulos/TopBar/Index"

import {ReactComponent as Carrinho} from "./Imagens/Carrinho.svg"
import ImgVazio from "./Imagens/ImagemExVazia.png"

import "./Style.css"
import { useEffect, useState } from "react"
import CatalogoControler from "../../Controle/CatalogoControler"
import CarrinhoControler from "../../Controle/CarrinhoControler"
function DescricaoPage(){
    const [CarrinhoFrame,SetCarrinhoFrame]=useState(false);
    const [Item,SetItem]=useState(null);
    const [MesmaMarca,SetMesmaMarca]=useState(null);
    const [Relativo,SetRelativo]=useState(null);

    const [NumeroItensCarrinho,SetNumeroItensCarrinho]=useState(1);

    const { search } = useLocation();

    const AdicionarProdutoNoCarrinho=async()=>{
        await SetCarrinhoFrame(false);
        await SetNumeroItensCarrinho(1)
        await CarrinhoControler.Adicionar(Item.constructor.name,Item.Id,NumeroItensCarrinho);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        const Id=search.slice(1) // slice() Remove o '?'
        const loadItems = async () => {
            if(Id==null){return}
            let item = await CatalogoControler.ObterItemByIndex(Id);
            const mesmaMarca = await CatalogoControler.ObterItemDaMarca(item);
            const relevantes = await CatalogoControler.ObterItemRelevantes(item);
            SetItem(item);
            SetMesmaMarca(mesmaMarca);
            SetRelativo(relevantes);
        };
        loadItems();
    }, [search]);
    
    return(
        <>
            <TopBar  TemBarraPesquisa={true}/>
            
            {CarrinhoFrame &&
                <div className="CarrinhoFrame">
                    <div>
                        <h2 className="Texto-Cordial">Deseja adicionar</h2>
                        <h2 className="Texto-Nome-Produto">{
                            Item && ((Item.Categoria==="Acessorio" &&
                                `${Item.Especificacao}: ${Item.Cor}`) ||
                                `${Item.Marca}: ${Item.Nome}`|| "##: ##"
                            )
                        }</h2>
                        <h2 className="Texto-Cordial">No seu carrinho?</h2>
                        <div className="Linha-Separação" style={{width:'calc(100% - 20px)'}}/>
                        <div className="Info-Div">
                            <label>Quantos? </label>
                            <input type="number" value={NumeroItensCarrinho} onChange={(Tgt)=>SetNumeroItensCarrinho(Tgt.target.value)}/>
                        </div>
                        <div className="Info-Div">
                            <label>Sub-Total</label>
                            <label>{Item && (NumeroItensCarrinho*Item.Valor.DinPix)}</label>
                        </div>
                        <div className="BotoesAcao">
                            <button onClick={()=>SetCarrinhoFrame(false)}>CANCELAR</button>
                            <button onClick={AdicionarProdutoNoCarrinho}>ADICIONAR</button>
                        </div>
                    </div>
                </div>
            }
            <div className="CorpoPagina" style={{
                maxWidth:'830px',
                marginTop:'10px',
                flexDirection:'column'}}>
                <section className="ItemInfos">
                    <div className="FotoItem">
                        <img src={(Item && `http://localhost:5000/${Item.Imagem}`) || ImgVazio} alt="Imagem do produto"/>
                    </div>
                    <div className="OutrasInfo">
                        <label className="NomeItem"> {
                            Item && ((Item.Categoria==="Acessorio" &&
                                `${Item.Especificacao}: ${Item.Cor}`) ||
                                `${Item.Marca}: ${Item.Nome}`|| "##: ##"
                            )
                        }
                        </label>
                        <label className="DescricaoItem"> {Item&&Item.Descricao} </label>
                        {(Item && Item.Intensidades!=="")&&
                        <div className="SaborIntencity">
                            <h4>Doce: $$$$</h4>
                            <progress value={Item.Intensidades.Doce} max={100} className="Doce" style={{backgroundColor:'transparent'}}/>
                            <h4>Gelada: $$$$</h4>
                            <progress value={Item.Intensidades.Gelada} max={100} className="Gelada" style={{backgroundColor:'transparent'}}/>
                            <h4>Quente: $$$$</h4>
                            <progress value={Item.Intensidades.Quente} max={100} className="Quente" style={{backgroundColor:'transparent'}}/>
                            <h4>Citrica: $$$$</h4>
                            <progress value={Item.Intensidades.Citrica} max={100} className="Citrica" style={{backgroundColor:'transparent'}}/>
                            <h4>Mentolada: $$$$</h4>
                            <progress value={Item.Intensidades.Mentolada} max={100} className="Mentolada" style={{backgroundColor:'transparent'}}/>
                        </div>
                        }
                        <button  onClick={()=>SetCarrinhoFrame(true)} className="BotaoCompra">
                            <Carrinho className="SVG-white"/>
                            ADICIONAR CARRINHO
                        </button>
                    </div>
                </section>

                {(MesmaMarca && MesmaMarca.length>0) &&
                <>
                    <h4 className="TextoSection">OUTRAS DA MESMA MARCA</h4>
                    <section className="ItensMarca">
                        {MesmaMarca.map((Produto,Index) => {
                            return <SmallItemCard
                                key={Index}
                                index={Index}
                                Objeto={Produto}
                                MostrarMarca={false}
                            />
                        })}
                    </section>
                </>
                }

                {(Relativo && Relativo.length>0) &&
                <>
                    <h4 className="TextoSection">ESSENCIAS PARECIDAS</h4>
                    <section className="ItensParecidos">
                        {Relativo.map((Produto,Index) => {
                            return <SmallItemCard
                                key={Index}
                                index={Index}
                                Objeto={Produto}
                                MostrarMarca={true}
                            />
                        })}
                    </section>
                </>
                }
            </div>
            
            <FooterBar/>
        </>
    )
}
export default DescricaoPage