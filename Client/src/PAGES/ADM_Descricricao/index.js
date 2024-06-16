// COMPONENTES IMPORTADOS //
import { useLocation } from "react-router-dom"
import FooterBar from "../../Modulos/FooterBar/Index"
import TopBar from "../../Modulos/TopBar/Index"

import ImgVazio from "./Imagens/ImagemExVazia.png"

import "./Style.css"
import { useEffect, useState } from "react"
import CatalogoControler from "../../Controle/CatalogoControler"
import AdmControlerInstance from "../../Controle/AdmControler"
function ADMDescricaoPage(){
    const [ID,SetID]=useState("");
    // UseState Global
    const [Marca,SetMarca]=useState("");
    const [Nome,SetNome]=useState("");
    const [Descricao,SetDescricao]=useState("");
    const [Imagem,SetImagem]=useState("");
    const [ImagemFile,SetImageFile]=useState(null);
    const [Quantidade,SetQuantidade]=useState(0);
    const [Valor,SetValor]=useState({"DinPix":0,"Cart":0});
    
    // UseState Categoria==Essencia
    const [Sabor,SetSabor]=useState("");
    const [Intensidades,SetIntensidades]=useState({'Doce':0,'Gelada':0,'Citrica':0,'Mentolada':0,'Quente':0});
    
    // UseState Categoria==Acessorio
    const [Cor,SetCor]=useState("");
    const [Especificacao,SetEspecificacao]=useState("");
    
    //UseState Diversos
    const [Categoria,SetCategoria]=useState("");
    
    const { search } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        const Id=search.slice(1) // slice() Remove o '?'
        const loadItems = async () => {
            if(Id===""){return}
            let item = await CatalogoControler.ObterItemByIndex(Id);
            if(item){
                await SetCategoria(item.Categoria)
                await SetCor(item.Cor)
                await SetDescricao(item.Descricao)
                await SetEspecificacao(item.Especificacao)
                await SetImagem(item.Imagem)
                await SetIntensidades(item.Intensidades)
                await SetMarca(item.Marca)
                await SetNome(item.Nome)
                await SetQuantidade(item.Quantidade)
                await SetSabor(item.Sabor)
                await SetValor(item.Valor)
                await SetID(item.ID)
            }
        };
        loadItems();
    }, [search]);

    const Adicionar_Atualizar_Button=async ()=>{

        const Form=new FormData()
        Form.append("Categoria",Categoria)
        Form.append("Cor",Cor)
        Form.append("Descricao",Descricao)
        Form.append("Especificacao",Especificacao)
        Form.append("file",ImagemFile)
        Form.append("Intensidades",JSON.stringify({
            "Doce":Intensidades.Doce,
            "Gelada":Intensidades.Gelada,
            "Citrica":Intensidades.Citrica,
            "Mentolada":Intensidades.Mentolada,
            "Quente":Intensidades.Quente
        }))
        Form.append("Marca",Marca)
        Form.append("Nome",Nome)
        Form.append("Quantidade",Quantidade)
        Form.append("Sabor",Sabor)
        Form.append("Valor",JSON.stringify({
            "DinPix":Valor.DinPix,
            "Cart":Valor.Cart
        }))

        if(ID){
            Form.append("Id",ID)
            AdmControlerInstance.AtualizarItem(ID,Form)
        }else{
            AdmControlerInstance.AdicionarItem(Form)
        }
    }

    const AdicionarImagem=(e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = async(event)=>{
            console.log(file)
            await SetImagem(event.target.result);
            await SetImageFile(file);
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <TopBar/>
            <div className="CorpoPagina" style={{flexDirection:'column',maxWidth:'830px',alignItems:'center'}}>
                <h5 style={{textAlign:'center',color:"white"}}>{ID!==""?"ALTERA":"NOVO"} PRODUTO</h5>

                <section className="ItemInfos">
                    <div className="FotoItem">
                        <img src={`http://localhost:5000/${Imagem}` || ImgVazio} alt="Imagem do produto"/>
                        <input type="file" onChange={AdicionarImagem}/>
                    </div>
                    <div className="OutrasInfo">
                        <label>NOME DO PRODUTO</label>
                        <input className="InputNome"
                            value={Nome}
                            onChange={(e)=>{SetNome(e.target.value)}}/>
                            
                        <label>MARCA DO PRODUTO</label>
                        <input className="InputNome"
                            value={Marca}
                            onChange={(e)=>{SetMarca(e.target.value)}}/>
                            
                        <label>DESCRIÇÃO DO PRODUTO</label>
                        <textarea className="InputDescricao"
                            value={Descricao}
                            onChange={(e)=>{SetDescricao(e.target.value)}}/>

                        <div className="Linha-Separação" style={{width:'100%'}}/>
                        <label>VALORES</label>
                        <div className="InputPagamento">
                            <section>
                                <label>DIN/PIX:</label>
                                <input min={0} type="Number"
                                    value={Valor["DinPix"]}
                                    onChange={(e)=>{SetValor({...Valor,"DinPix":e.target.value})}}/>
                            </section>
                            <section>
                                <label>CARTÃO:</label>
                                <input min={0}type="Number"
                                    value={Valor["Cart"]}
                                    onChange={(e)=>{SetValor({...Valor,"Cart":e.target.value})}}/>
                            </section>
                        </div>
                        <div className="Linha-Separação" style={{width:'100%'}}/>
                        <label>QUANTIDADE</label>
                        <input min={0} type="Number"
                            value={Quantidade}
                            onChange={(e)=>{SetQuantidade(e.target.value)}}
                        />
                    </div>
                </section>

                <div className="SelectionDiv">
                    <div className="Linha-Separação" style={{width:'100%'}}/>
                    <select value={Categoria}
                        onChange={(e)=>{SetCategoria(e.target.value)}}
                    >
                        <option value={"-- select --"}>-- select --</option>
                        <option value={"Essencia"}>Essencia</option>
                        <option value={"Carvao_Aluminio"}>Carvão_Aluminio</option>
                        <option value={"Acessorio"}>Acessorio</option>
                    </select>
                    <div className="Linha-Separação" style={{width:'100%'}}/>
                </div>

                <div className="InformacoesEspecificas">
                    {Categoria==="Essencia"?
                    <>
                        <label>SABOR</label>
                        <input className="InputSabor"
                                value={Sabor}
                                onChange={(e)=>{SetSabor(e.target.value)}}/>
                                
                        <label>INTENSIDADES</label>
                        <div className="InputsIntensidades">
                            <section>
                                <label>Doce</label>
                                <input
                                    className="Doce"
                                    step={25}
                                    type="range"
                                    style={{'--Size':Intensidades['Doce']/100}}
                                    value={Intensidades['Doce']}
                                    onChange={(e)=>{SetIntensidades({...Intensidades, Doce:e.target.value})}}
                                />
                            </section>
                            <section>
                                <label>Gelada</label>
                                <input
                                    className="Gelada"
                                    step={25}
                                    type="range"
                                    style={{'--Size':Intensidades['Gelada']/100}}
                                    value={Intensidades['Gelada']}
                                    onChange={(e)=>{SetIntensidades({...Intensidades, Gelada:e.target.value})}}
                                />
                            </section>
                            <section>
                                <label>Quente</label>
                                <input
                                    className="Quente"
                                    step={25}
                                    type="range"
                                    style={{'--Size':Intensidades['Quente']/100}}
                                    value={Intensidades['Quente']}
                                    onChange={(e)=>{SetIntensidades({...Intensidades, Quente:e.target.value})}}
                                />
                            </section>
                            <section>
                                <label>Citrica</label>
                                <input
                                    className="Citrica"
                                    step={25}
                                    type="range"
                                    style={{'--Size':Intensidades['Citrica']/100}}
                                    value={Intensidades['Citrica']}
                                    onChange={(e)=>{SetIntensidades({...Intensidades, Citrica:e.target.value})}}
                                />
                            </section>
                            <section>
                                <label>Mentolada</label>
                                <input
                                    className="Mentolada"
                                    step={25}
                                    type="range"
                                    style={{'--Size':Intensidades['Mentolada']/100}}
                                    value={Intensidades['Mentolada']}
                                    onChange={(e)=>{SetIntensidades({...Intensidades, Mentolada:e.target.value})}}
                                />
                            </section>
                        </div>
                    </>:
                    Categoria==="Acessorio"?
                    <>
                        <label>ESPECIFICAÇÃO</label>
                        <input className="InputSabor"
                                value={Especificacao}
                                onChange={(e)=>{SetEspecificacao(e.target.value)}}/>

                        <label>COR</label>
                        <input className="InputSabor"
                                value={Cor}
                                onChange={(e)=>{SetCor(e.target.value)}}/>
                    </>:
                    null
                    }
                </div>

                <button className="BotaoFinalizarADM" onClick={Adicionar_Atualizar_Button}> FINALIZAR </button>
            </div>
            <FooterBar/>
        </>
    );
}
export default ADMDescricaoPage