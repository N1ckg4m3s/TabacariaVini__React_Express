// COMPONENTES IMPORTADOS  //
import FooterBar from "../../Modulos/FooterBar/Index"
import TopBar from "../../Modulos/TopBar/Index"

import { ReactComponent as SetaBaixo } from "./Imagens/SetaBaixo.svg";
import { ReactComponent as Edit } from "./Imagens/Edit.svg";

import "./Style.css"
import { useEffect, useState } from "react";
import AdmControlerInstance from "../../Controle/AdmControler";
import { Link } from "react-router-dom";
function AdmPage(){
    const CardPorPagina=20
    const [ShowAtualizados,SetShowAtualizados]=useState(true);
    const [ItensAtualizados,SetItensAtualizados]=useState([]);
    const [PaginacaoItensAtualizados,SetPaginacaoItensAtualizados] = useState([0,0])
    
    const [ShowSistema,SetShowSistema]=useState(true);
    const [ItensSistema,SetItensSistema]=useState([]);
    const [PaginacaoItensSistema,SetPaginacaoItensSistema] = useState([0,0])
    
    const [ShowPromo,SetShowPromo]=useState(true);
    const [ItensPromo,SetItensPromo]=useState([]);
    const [PaginacaoShowPromo,SetPaginacaoShowPromo] = useState([0,0])

    useEffect(()=>{
        const ObterItensDoBack=async()=>{
            let Valores = await AdmControlerInstance.ObterItensSistema()
            await SetItensSistema(Valores)
            await SetPaginacaoItensSistema([0, Math.ceil((Valores||[]).length / CardPorPagina)]);
            
            Valores = await AdmControlerInstance.ObterPromos()
            await SetItensPromo(Valores)
            await SetPaginacaoShowPromo([0, Math.ceil((Valores||[]).length / CardPorPagina)]);
            
            Valores = await AdmControlerInstance.ObterItensAtualizados()
            await SetItensAtualizados(Valores)
            await SetPaginacaoItensAtualizados([0, Math.ceil((Valores||[]).length / CardPorPagina)]);
        }
        ObterItensDoBack()
    },[])
    
    if(false){
        console.log(
            ShowAtualizados,
            ItensAtualizados,
            PaginacaoItensAtualizados,
            ShowPromo,
            ItensPromo,
            PaginacaoShowPromo
        )
        SetShowPromo()
        SetShowAtualizados()
    }

    return(
        <>
            <TopBar TemBarraPesquisa={false}/>
            <div className="CorpoPagina" style={{flexDirection:'column'}}>
                <section className="BotoesAcaoFetch">
                    <Link to={"/ADMDescricao"}> NOVO </Link>
                    <button>FETCH</button>
                </section>
                {/* <section className="TabelaSection">
                    <div className="Linha-Separação"/>
                    <button onClick={()=>{SetShowAtualizados(!ShowAtualizados)}}>
                        <span>ITENS ATUALIZADOS</span>
                        <SetaBaixo className={`SVG-white ${(ShowAtualizados&&"AoContrario")||""}`}/>
                    </button>
                    {ShowAtualizados&&
                    <table className="TableShowItens">
                        <thead> 
                            <tr>
                                <th className="TableIndex"> ## </th>
                                <th className="TableItem"> ITEM </th>
                                <th className="TableQntVal"> QUANTIDADE </th>
                                <th className="TableQntVal"> VALOR </th>
                                <th className="TableQntVal"> ## </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ItensAtualizados&&ItensAtualizados.slice(
                                CardPorPagina * PaginacaoItensAtualizados[0],
                                CardPorPagina + CardPorPagina * PaginacaoItensAtualizados[0]
                            ).map((Valor,Index)=>{
                                return(
                                    <tr key={Index} >
                                        <th className="TableIndex"> ## </th>
                                        <th className="TableItem"> ITEM </th>
                                        <th className="TableQntVal"> QUANTIDADE </th>
                                        <th className="TableQntVal"> VALOR </th>
                                        <th className="TableQntVal"> ## </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    }

                    {PaginacaoItensAtualizados[1]>1 &&
                    <div className="PaginacaoDiv">
                        <button className="BotaoPaginacao" disabled={PaginacaoItensAtualizados[0]===0}
                            onClick={()=>{SetPaginacaoItensAtualizados([PaginacaoItensAtualizados[0]-1,PaginacaoItensAtualizados[1]])}}
                        >{"<"}</button>
                        <div className="PaginasSelecionar">
                            {Array.from({length:PaginacaoItensAtualizados[1]}, (_,index)=>{
                                return <button
                                key={index}
                                className={PaginacaoItensAtualizados[0]===index ? "PaginasSelecionada" : ""}
                                onClick={()=>{SetPaginacaoItensAtualizados([index,PaginacaoItensAtualizados[1]])}}
                                >{index}</button>
                            })}
                        </div>
                        <button className="BotaoPaginacao"  disabled={PaginacaoItensAtualizados[0]>=PaginacaoItensAtualizados[1]-1}
                            onClick={()=>{SetPaginacaoItensAtualizados([PaginacaoItensAtualizados[0]+1,PaginacaoItensAtualizados[1]])}}
                        >{">"}</button>
                    </div>}

                </section> */}
                
                <section className="TabelaSection">
                    <div className="Linha-Separação"/>
                    <button onClick={()=>{SetShowSistema(!ShowSistema)}}>
                        <span>ITENS DO SISTEMA</span>
                        <SetaBaixo className={`SVG-white ${(ShowSistema&&"AoContrario")||""}`}/>
                    </button>
                    {ShowSistema&&
                    <table className="TableShowItens">
                        <thead> 
                            <tr>
                                <th className="TableIndex"> ## </th>
                                <th className="TableItem"> ITEM </th>
                                <th className="TableQntVal"> QUANTIDADE </th>
                                <th className="TableQntVal"> VALOR </th>
                                <th className="TableQntVal"> ## </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ItensSistema&&ItensSistema.slice(
                                CardPorPagina * PaginacaoItensSistema[0],
                                CardPorPagina + CardPorPagina * PaginacaoItensSistema[0]
                            ).map((Valor,Index)=>{
                                return(
                                    <tr key={Index} >
                                        <th className="TableIndex">{Valor.ID}</th>
                                        <th className="TableItem">
                                            {`${Valor.Categoria} || ${Valor.Marca}: ${Valor.Nome}`}
                                        </th>
                                        <th className="TableQntVal">{Valor.Quantidade}</th>
                                        <th className="TableQntVal">{Valor.Valor.DinPix}</th>
                                        <th className="TableQntVal">
                                            <Link to={`/ADMDescricao?${Valor.ID}`}>
                                                <Edit className="SVG-white"/>
                                            </Link>
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    }

                    {PaginacaoItensSistema[1]>1 &&
                    <div className="PaginacaoDiv">
                        <button className="BotaoPaginacao" disabled={PaginacaoItensSistema[0]===0}
                            onClick={()=>{SetPaginacaoItensSistema([PaginacaoItensSistema[0]-1,PaginacaoItensSistema[1]])}}
                        >{"<"}</button>
                        <div className="PaginasSelecionar">
                            {Array.from({length:PaginacaoItensSistema[1]}, (_,index)=>{
                                return <button
                                key={index}
                                className={PaginacaoItensSistema[0]===index ? "PaginasSelecionada" : ""}
                                onClick={()=>{SetPaginacaoItensSistema([index,PaginacaoItensSistema[1]])}}
                                >{index}</button>
                            })}
                        </div>
                        <button className="BotaoPaginacao"  disabled={PaginacaoItensSistema[0]>=PaginacaoItensSistema[1]-1}
                            onClick={()=>{SetPaginacaoItensSistema([PaginacaoItensSistema[0]+1,PaginacaoItensSistema[1]])}}
                        >{">"}</button>
                    </div>}

                </section>

                {/* <section className="TabelaSection">
                    <div className="Linha-Separação"/>
                    <button onClick={()=>{SetShowPromo(!ShowPromo)}}>
                        <span>PROMOÇÕES</span>
                        <SetaBaixo className={`SVG-white ${(ShowPromo&&"AoContrario")||""}`}/>
                    </button>
                    {ShowPromo&&
                    <table className="TableShowItens">
                        <thead> 
                            <tr>
                                <th className="TableIndex"> ## </th>
                                <th className="TableItem"> ITEM </th>
                                <th className="TableQntVal"> QUANTIDADE </th>
                                <th className="TableQntVal"> VALOR </th>
                                <th className="TableQntVal"> ## </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ItensPromo&&ItensPromo.slice(
                                CardPorPagina * PaginacaoShowPromo[0],
                                CardPorPagina + CardPorPagina * PaginacaoShowPromo[0]
                            ).map((Valor,Index)=>{
                                return(
                                    <tr key={Index} >
                                        <th className="TableIndex"> ## </th>
                                        <th className="TableItem"> ITEM </th>
                                        <th className="TableQntVal"> QUANTIDADE </th>
                                        <th className="TableQntVal"> VALOR </th>
                                        <th className="TableQntVal"> ## </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    }

                    {PaginacaoShowPromo[1]>1 &&
                    <div className="PaginacaoDiv">
                        <button className="BotaoPaginacao" disabled={PaginacaoShowPromo[0]===0}
                            onClick={()=>{SetPaginacaoShowPromo([PaginacaoShowPromo[0]-1,PaginacaoShowPromo[1]])}}
                        >{"<"}</button>
                        <div className="PaginasSelecionar">
                            {Array.from({length:PaginacaoShowPromo[1]}, (_,index)=>{
                                return <button
                                key={index}
                                className={PaginacaoShowPromo[0]===index ? "PaginasSelecionada" : ""}
                                onClick={()=>{SetPaginacaoShowPromo([index,PaginacaoShowPromo[1]])}}
                                >{index}</button>
                            })}
                        </div>
                        <button className="BotaoPaginacao"  disabled={PaginacaoShowPromo[0]>=PaginacaoShowPromo[1]-1}
                            onClick={()=>{SetPaginacaoShowPromo([PaginacaoShowPromo[0]+1,PaginacaoShowPromo[1]])}}
                        >{">"}</button>
                    </div>}

                </section> */}
            </div>
            <FooterBar/>
        </>
    )
}
export default AdmPage