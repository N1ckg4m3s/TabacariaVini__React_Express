// COMPONENTES IMPORTADOS //
import { useLocation } from "react-router-dom"
import FooterBar from "../../Modulos/FooterBar/Index"
import TopBar from "../../Modulos/TopBar/Index"

import { Produto } from "../../Controle/Classes"

import "./Style.css"
import { useEffect, useState } from "react"
function ADMComboPromocaoPage(){
    //UseState Diversos
    const [minDate,_] = useState(()=>{
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        return `${year}-${month}-${day}`;
    })

    const ProdutoParaFind =new Produto()
    const [Categoria,SetCategoria]=useState("");
    
    const { search } = useLocation();

    useEffect(() => {
        const Id=search.slice(1) // slice() Remove o '?'
        const loadItems = async () => {
            if(Id===""){return}

        };
        loadItems();
    }, [search]);
    /// Apenas para sumir o Warn de erro
    if(false){
        console.log(ProdutoParaFind)
    }

    return (
        <>
            <TopBar/>
            <div className="CorpoPagina" style={{flexDirection:'column',maxWidth:'500px',alignItems:'center'}}>
                <div className="SelectionDiv">
                    <div className="Linha-Separação" style={{width:'100%'}}/>
                    <select value={Categoria} onChange={(e)=>{SetCategoria(e.target.value)}}>
                        <option value={"-- select --"}>-- select --</option>
                        <option value={"Promocao"}>Promoção</option>
                        <option value={"Combo"}>Combo</option>
                    </select>
                    <div className="Linha-Separação" style={{width:'100%'}}/>
                </div>

                PROMOTION AREA
                <section className="SectionComboPromocao">
                    <div className="SelectionsContainer">
                        <select value={null} onChange={(e)=>{}}>
                            <option value={"-- select --"}>MARCA: -- select --</option>
                            <option value={""}>MARCA: Ex. 1 </option>
                            <option value={""}>MARCA: Ex. 2</option>
                            <option value={""}>MARCA: Ex. 3</option>
                        </select>
                        <select value={null} onChange={(e)=>{}}>
                            <option value={"-- select --"}>ESPECIFICAÇÃO: -- Geral --</option>
                            <option value={""}>ESPECIFICAÇÃO: Ex. 1 </option>
                            <option value={""}>ESPECIFICAÇÃO: Ex. 2</option>
                            <option value={""}>ESPECIFICAÇÃO: Ex. 3</option>
                        </select>
                    </div>
                    <div className="Input_Selection">
                        <input placeholder="Desconto" type="number"/>
                        <select value={null} onChange={(e)=>{}}>
                            <option value={"$"}>$</option>
                            <option value={"%"}>%</option>
                        </select>
                    </div>
                    <input placeholder="Quantidade minima" type="number"/>
                    <input placeholder="Duração" type="date" min={minDate}/>
                </section>

                COMBO AREA
                <section className="SectionComboPromocao">
                    <input placeholder="Nome"/>
                    <h4>Itens que o cliente podera alterar</h4>

                    <div className="GrupoItensCombo">
                        <div className="SelectionsContainer">
                            <select value={null} onChange={(e)=>{}}>
                                <option value={"-- select --"}>MARCA: -- select --</option>
                                <option value={""}>MARCA: Ex. 1 </option>
                                <option value={""}>MARCA: Ex. 2</option>
                                <option value={""}>MARCA: Ex. 3</option>
                            </select>
                            <select value={null} onChange={(e)=>{}}>
                                <option value={"-- select --"}>ESPECIFICAÇÃO: -- Geral --</option>
                                <option value={""}>ESPECIFICAÇÃO: Ex. 1 </option>
                                <option value={""}>ESPECIFICAÇÃO: Ex. 2</option>
                                <option value={""}>ESPECIFICAÇÃO: Ex. 3</option>
                            </select>
                            <input/>
                        </div>
                    </div>

                    <h4>Itens que o cliente não podera alterar</h4>

                    <div className="Input_Selection">
                        <input placeholder="Desconto" type="number"/>
                        <select value={null} onChange={(e)=>{}}>
                            <option value={"$"}>$</option>
                            <option value={"%"}>%</option>
                        </select>
                    </div>
                    <input placeholder="Duração" type="date" min={minDate}/>
                </section>

            </div>
            <FooterBar/>
        </>
    );
}
export default ADMComboPromocaoPage