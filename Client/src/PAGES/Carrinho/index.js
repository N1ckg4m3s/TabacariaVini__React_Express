import { useEffect, useState } from "react";
import CarrinhoControler from "../../Controle/CarrinhoControler";
import FooterBar from "../../Modulos/FooterBar/Index";
import TopBar from "../../Modulos/TopBar/Index";

import { ReactComponent as Whats } from "./Imagens/whatsapp.svg";
import { ReactComponent as Edit } from "./Imagens/Edit.svg";
import { ReactComponent as Remov } from "./Imagens/Remover.svg";
import { ReactComponent as Certo } from "./Imagens/Certo.svg";

import "./Style.css";
import CatalogoControlerInstance from "../../Controle/CatalogoControler";

function CarrinhoPage() {
    const [RecarregarTela, SetRecarregarTela] = useState(false);
    const [Editando, SetEditando] = useState(-1);
    const [NovoQuantos, SetNovoQuantos] = useState(0);
    const [FormaPagamento, SetFormaPagamento] = useState("");
    const [ItensCarrinho, SetItensCarrinho] = useState([]);

    const MandarProWhatsapp = () => {
        const listaItens = ItensCarrinho.map((Value, Index) =>
            `${Value.Produto.ParaMensagem(Value.Quantidade || "Erro")}\n`
        );

        const Texto = `
Olá! Fiz um pedido pelo site:
${listaItens}
Forma de pagamento: ${FormaPagamento === "" ? "[Não informado]" : FormaPagamento}
No site ficou no valor de ${CarrinhoControler.CalcularValor(FormaPagamento)}, Esta correto?

Aguardo confirmação. Obrigado!`.replace(/,/g, '');

        window.open(`whatsapp://send?phone=+5511983317216&text=${encodeURIComponent(Texto)}`);
    };

    useEffect(() => {
        async function fetchItensCarrinho() {
            await CarrinhoControler.obterDoBrowser();
            try {
                const itensPromises = CarrinhoControler.TodosOsItens.map(async (Value) => {
                    const item = await CatalogoControlerInstance.ObterItemByIndex(Value.Produto.Classe, Value.Produto.Id);
                    return { Produto: item, Quantidade: Value.Quantidade };
                });
                const itens = await Promise.all(itensPromises);
                SetItensCarrinho(itens);
            } catch (error) {
                console.error("Erro ao carregar itens do carrinho:", error);
            }
        }

        fetchItensCarrinho();
    }, [Editando]);

    return (
        <>
            <TopBar TemBarraPesquisa={true}/>
            <div className="CorpoPagina" style={{
                maxWidth:'830px',
                marginTop:'10px',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'space-between'
            }}>
                <section className="CardNotificacao Aviso">
                    <h4>AVISO</h4>
                    <p>No momento, o carrinho de compras é apenas para cotação de valores, ao final 
                        da pagina tem um botão que envia o pedido direto para o WhatsApp da loja</p>
                </section>
                
                <div className="Linha-Separação" style={{
                    width:'100%',
                    backgroundColor:'var(--CardPrimary)',
                    marginTop:'20px'
                }}/>

                <table className="TableShowItens">
                    <thead>
                        <tr>
                            <th className="TableIndex"> ## </th>
                            <th className="TableItem"> ITEM </th>
                            <th className="TableQntVal"> QUANTIDADE </th>
                            <th className="TableQntVal"> SUB-TOTAL </th>
                            <th className="TableQntVal"> ## </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    ItensCarrinho.map((Value,Index)=>{
                    return (
                        <tr key={Index}>
                            <th className="TableIndex">{Index<9 ? `0${Index+1}` : Index+1}</th>
                            <th className="TableItem"> {`${Value.Produto.Especificacao || Value.Produto.Marca}: 
                            ${
                                (Value.Produto.Nome ||
                                Value.Produto.Cor
                                )}`} </th>
                            <th className="TableQntVal">
                                {Editando===Index?
                                    <input
                                        type="Number"
                                        value={NovoQuantos}
                                        onChange={(Tgt)=>SetNovoQuantos(Tgt.target.value)}/>
                                    :Value.Quantidade
                                }
                            </th>
                            <th className="TableQntVal">
                                {(
                                    /* Dieferentes e Não falou a forma de pagamento #### */
                                    /* Dieferentes e falou a forma de pagamento, Valor de cada */
                                    /* Não Dieferentes, Falar Valor */
                                    // Quantidade=Editando!==-1?Value.Quantidade:NovoQuantos
                                    Value.Produto.Preco.DinPix!==Value.Produto.Preco.Cart?
                                        FormaPagamento===""? "##,##" :
                                            (FormaPagamento==="Pix"||FormaPagamento==="Dim")? Value.Produto.Preco.DinPix*(Editando!==-1?Value.Quantidade:NovoQuantos):
                                            FormaPagamento==="Cart"? Value.Produto.Preco.Cart*(Editando!==-1?Value.Quantidade:NovoQuantos):0:
                                    Value.Produto.Preco.DinPix*(Editando!==-1?NovoQuantos:Value.Quantidade)
                                )
                                }
                            </th>
                            {
                                Editando===Index?
                                <th className="TableQntVal">
                                    <button className="AceitarTroca-Item"
                                        onClick={async()=>{
                                            await CarrinhoControler.Atualizar(Index,NovoQuantos)
                                            SetEditando(-1)
                                        }}>
                                        <Certo className="SVG-green"/>
                                    </button>
                                </th>:
                                <th className="TableQntVal">
                                    <button className="Edit-Item"
                                        onClick={async()=>{
                                            await SetNovoQuantos(Value.Quantidade)
                                            SetEditando(Index)
                                        }}
                                    ><Edit className="SVG-blue"/></button>
                                    <button className="Delete-Item"
                                        onClick={async()=>{
                                            await CarrinhoControler.Remover(Index)
                                            SetRecarregarTela(!RecarregarTela)
                                        }}
                                    ><Remov className="SVG-red"/></button>
                                </th>
                            }
                        </tr>
                    )})}
                    </tbody>
                </table>

                <div className="Linha-Separação" style={{
                    width:'100%',
                    backgroundColor:'var(--CardPrimary)',
                    marginBottom:'20px'
                }}/>

                <section className="CardNotificacao Observacao">
                    <h4>OBSERVAÇÃO</h4>
                    <p>O valor indicado como #### está sujeito a variações 
                        de preço conforme a forma de pagamento escolhida.</p>
                </section>
                
                <div className="TablePagamento">
                    <div className="Pagamento">
                        <h5>PAGAMENTO</h5>
                        <div>
                            <input 
                                type="radio"
                                id="PgntDim" 
                                name="formaPagamento" 
                                value="Dim"
                                checked={FormaPagamento === "Dim"}
                                onChange={() => SetFormaPagamento("Dim")}
                            /> 
                            <label htmlFor="PgntDim">DINHEIRO</label>
                        </div>

                        <div> 
                            <input 
                                type="radio"
                                id="PgntCrt" 
                                name="formaPagamento" 
                                value="Cart"
                                checked={FormaPagamento === "Cart"}
                                onChange={() => SetFormaPagamento("Cart")}
                            /> 
                            <label htmlFor="PgntCrt">CARTÃO</label>
                        </div>

                        <div> 
                            <input 
                                type="radio"
                                id="PgntPix" 
                                name="formaPagamento" 
                                value="Pix"
                                checked={FormaPagamento === "Pix"}
                                onChange={() => SetFormaPagamento("Pix")}
                            /> 
                            <label htmlFor="PgntPix">PIX</label>
                        </div>
                    </div>
                    <div className="Totais">
                        <h5>VALOR</h5>
                        <h4>{`Pedido: ${CarrinhoControler.CalcularValor(FormaPagamento,ItensCarrinho)}`} </h4>
                        <h4>Taxa de entrega: Consultar pelo WhatsApp</h4>
                        <button onClick={MandarProWhatsapp}>
                            <span>Enviar</span>
                            <Whats className="SVG-white"/>
                        </button>
                    </div>
                </div>
            </div>
            <FooterBar/>
        </>
    )
}
export default CarrinhoPage