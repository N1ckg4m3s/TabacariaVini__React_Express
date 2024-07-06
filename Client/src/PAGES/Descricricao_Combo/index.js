// COMPONENTES IMPORTADOS //
import { useLocation } from "react-router-dom"
import FooterBar from "../../Modulos/FooterBar/Index"
import SmallItemCard from "../../Modulos/SmallItemCard"
import TopBar from "../../Modulos/TopBar/Index"

import {ReactComponent as Carrinho} from "./Imagens/Carrinho.svg"

import "./Style.css"
import { useEffect, useState } from "react"
import CatalogoControler from "../../Controle/CatalogoControler"
import CarrinhoControlerInstance from "../../Controle/CarrinhoControler"
function DescricaoComboPage(){
    const [Combo,SetCombo]=useState(null);
    const [Relativo,SetRelativo]=useState(null);
    const [Error,SetError]=useState(false);

    const { search } = useLocation();

    const AdicionarItem=(Produto)=>{
        const Posicao=Combo.ItensSelecionaveis.findIndex(V=>
            V.CLASSE===Produto.Categoria && V.SELECIONADO===-1
        )
        SetCombo((Anterior)=>{
            const NovoCombo={...Anterior}
            if (Posicao !== -1) {
                NovoCombo.ItensSelecionaveis[Posicao] = {
                    ...NovoCombo.ItensSelecionaveis[Posicao],
                    SELECIONADO: Produto.ID
                };
            }
            return NovoCombo
        })
    }
    const AdicionarNoCarrinho=()=>{
        console.log("asndkjsan")
        const Posicao=Combo.ItensSelecionaveis.findIndex(V=>V.SELECIONADO===-1)
        console.log(Posicao)
        if(Posicao===-1){
            console.log("Pode adicionar")
            CarrinhoControlerInstance.Adicionar("Combo",search.slice(1),Combo)
        }else{
            console.log("Esqueceu um item")
            SetError(true)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        const Id=search.slice(1) // slice() Remove o '?'
        const loadItems = async () => {
            if(Id==null){return}
            let Combo = await CatalogoControler.ObterComboByID(Id);
            const relevantes = await CatalogoControler.ObterRelativosCombo(Id);
            SetCombo(Combo);
            SetRelativo(relevantes);
        };
        loadItems();
    }, [search]);
    
    return(
        <>
            <TopBar  TemBarraPesquisa={true}/>
            
            <div className="CorpoPagina" style={{maxWidth:'830px',marginTop:'10px',flexDirection:'column',alignItems:'center'}}>

                <section className="sectionDescricaoCombo">
                    <div>
                        <span>de:<span>100</span></span>
                        <span>por:<span>50</span></span>
                    </div>
                    <table className="TableShowItens">
                        <thead>
                            <tr>
                                <th className="TableItem"> ITEM DO COMBO </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Combo && Combo.ItensFixos && Combo.ItensFixos.map((Item,Index)=>
                                <tr key={Index}><th className="TableItem"> {`${Item.CLASSE} | ${Item.MARCA} : ${Item.NOME}`}</th></tr>
                            )}
                            {Combo && Combo.ItensSelecionaveis && Combo.ItensSelecionaveis.map((Item,Index)=>
                                <tr key={Index}><th className="TableItem">
                                    {`${Item.CLASSE} | ${Item.MARCA} : ${Item.SELECIONADO===-1 ?"-Não Selecionado-" :Relativo[Item.SELECIONADO].Nome}`}
                                    {(Error&&Item.SELECIONADO===-1)&&<span>Item não Selecionado</span>}
                                </th></tr>
                            )}
                        </tbody>
                    </table>
                </section>

                {(Relativo && Relativo.length>0) &&
                <>
                    <h4 className="TextoSection">SELECIONE OS ITENS</h4>
                    <section className="ItensParecidos">
                        {Relativo.map((Produto,Index) => {
                            return <SmallItemCard
                                key={Index}
                                index={Index}
                                Objeto={Produto}
                                MostrarMarca={true}
                                CustonFunction={()=>AdicionarItem(Produto)}
                            />
                        })}
                    </section>
                </>
                }

                <button  onClick={AdicionarNoCarrinho} className="BotaoCompra">
                    <Carrinho className="SVG-white"/>
                    ADICIONAR CARRINHO
                </button>
            </div>
            
            <FooterBar/>
        </>
    )
}
export default DescricaoComboPage