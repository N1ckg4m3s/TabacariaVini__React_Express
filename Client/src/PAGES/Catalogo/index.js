// COMPONENTES IMPORTADOS //
import { useEffect, useState } from "react";
import FooterBar from "../../Modulos/FooterBar/Index"
import ItemCard from "../../Modulos/ItemCard"
import TopBar from "../../Modulos/TopBar/Index"

import {ReactComponent as FiltroIcon} from "./ImagensPagina/Filtro.svg"
import {ReactComponent as ZeroResult} from "./ImagensPagina/ZeroResult.svg"

import { useLocation } from "react-router-dom";

import "./Style.css"
import CatalogoControler from "../../Controle/CatalogoControler";
import FiltroEssencias from "../../Modulos/FiltroEssencia";
function CatalogoPage(){
    const {hash,search}=useLocation()
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [FiltrAberto,SetFiltrAberto] = useState(false)

    const CardPorPagina= ((windowWidth>=980 && 4) ||
            (windowWidth<979 && windowWidth>=850 && 3) ||
            (windowWidth<850 && windowWidth>=716 && 4) ||
            (windowWidth<716 && windowWidth>=537 && 3) || 2)*5
    
    const [ProdutosCatalogo,SetProdutosCatalogo] = useState([])
    const [ProdutosCatalogoFILTRADO,SetProdutosCatalogoFILTRADO] = useState([])
    const [Paginacao,SetPaginacao] = useState([0,0])
    useEffect(() => {
        const CarregarDados = async () => {
            try {
                let Valores = null;
                if (hash !== "") {
                    switch (hash) {
                        case "#Categoria=Essencia":
                            Valores = await CatalogoControler.ObterCategoriaEssencias();
                            break;
                        case "#Categoria=Carvao_Aluminio":
                            Valores = await CatalogoControler.ObterCategoriaCarvao_Aluminio();
                            break;
                        case "#Categoria=Acessorio":
                            Valores = await CatalogoControler.ObterCategoriaAcessorios();
                            break;
                        default:
                            break;
                    }
                    if (Valores) {
                        await SetProdutosCatalogo(Valores);
                        await SetPaginacao([0, Math.ceil(Valores.length / CardPorPagina)]);
                    } else {
                        await SetProdutosCatalogo([]);
                        await SetPaginacao([0, 0]);
                    }
                } else if (search !== "") {
                    Valores = await CatalogoControler.FiltrarPorPesquisa(search.split("=")[1])
                    if (Valores) {
                        await SetProdutosCatalogo(Valores);
                        await SetPaginacao([0, Math.ceil(Valores.length / CardPorPagina)]);
                    } else {
                        await SetProdutosCatalogo([]);
                        await SetPaginacao([0, 0]);
                    }
                } else {
                    console.log("Deu Else");
                }
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };
    
        CarregarDados();
    
        // Listener para redimensionamento da tela
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    
        // Cleanup do event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [hash, search, CardPorPagina]);
    
    return(
        <>
            <TopBar TemBarraPesquisa={true}/>
            <button className="BotaoFiltro" onClick={()=>SetFiltrAberto(!FiltrAberto)}>
                FILTRAR
                <FiltroIcon className="SVG-white"/>
            </button>
            {(windowWidth<850 && FiltrAberto) && <div className="FILTRO">
                <FiltroEssencias Itens={ProdutosCatalogo}
                    CallBack={async(ItensFiltrdos)=>{
                        await SetProdutosCatalogoFILTRADO(ItensFiltrdos)
                        await SetPaginacao([0, Math.ceil(ItensFiltrdos.length / CardPorPagina)]);
                        SetFiltrAberto(false)
                    }}
                />
            </div>}
            <div className="CorpoPagina">
                {windowWidth>850 && <div className="FILTRO">
                    <FiltroEssencias Itens={ProdutosCatalogo}
                        CallBack={async(ItensFiltrdos)=>{
                            await SetProdutosCatalogoFILTRADO(ItensFiltrdos)
                            await SetPaginacao([0, Math.ceil(ItensFiltrdos.length / CardPorPagina)]);
                        }}
                    />
                </div>}
                <div style={{width:"100%"}}>
                    <div className="Catalogo">
                        {((ProdutosCatalogoFILTRADO.length>0 && ProdutosCatalogoFILTRADO) || ProdutosCatalogo).slice(
                        CardPorPagina * Paginacao[0],
                        CardPorPagina + CardPorPagina * Paginacao[0]
                    ).map((Value, Index) => {
                        return <ItemCard
                            key={Index}
                            Objeto={Value}
                        />;
                    })}
                    {!ProdutosCatalogo && !ProdutosCatalogoFILTRADO &&
                        <ZeroResult />
                    }
                    </div>

                    {Paginacao[1]>1 &&
                        <div className="PaginacaoDiv">
                            <button className="BotaoPaginacao" disabled={Paginacao[0]===0}
                                onClick={()=>{SetPaginacao([Paginacao[0]-1,Paginacao[1]])}}
                            >{"<"}</button>
                            <div className="PaginasSelecionar">
                                {Array.from({length:Paginacao[1]}, (_,index)=>{
                                    return <button
                                    key={index}
                                    className={Paginacao[0]===index ? "PaginasSelecionada" : ""}
                                    onClick={()=>{SetPaginacao([index,Paginacao[1]])}}
                                    >{index}</button>
                                })}
                            </div>
                            <button className="BotaoPaginacao"  disabled={Paginacao[0]>=Paginacao[1]-1}
                                onClick={()=>{SetPaginacao([Paginacao[0]+1,Paginacao[1]])}}
                            >{">"}</button>
                        </div>
                    }
                </div>
            </div>
            <FooterBar/>
        </>
    )
}
export default CatalogoPage