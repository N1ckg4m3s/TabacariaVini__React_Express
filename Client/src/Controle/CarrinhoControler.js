import { Combo, ComboNoCarrinho, ProdutoCarinho } from "./Classes" 
const LocalStorageName="Carrinho-V1.2"
class CarrinhoControler{
    TodosOsItens=[];

    Adicionar=(Classe, Id, Quantidade_Item)=>{
        console.log("Adicionar",Classe, Id ,Quantidade_Item)
        if(Classe==="Combo"){
            console.log("é combo")
            this.TodosOsItens.push(new ComboNoCarrinho(Id,Quantidade_Item.ItensSelecionaveis))
        }else{
            console.log("é Produto")
            this.TodosOsItens.push(new ProdutoCarinho(Id,Classe,Quantidade_Item))
        }
        this.salvarNoBrowser()
    }

    Atualizar=(Index, Quantidade)=>{this.TodosOsItens[Index].Quantidade=Quantidade}

    Remover=(Index)=>{this.TodosOsItens.pop(Index,1)}

    CalcularValor = (formaPagamento, Itens) => {
        let valorTotal = 0;
        let valoresIguais = true; // Flag para verificar se todos os itens têm preços iguais
    
        Itens.forEach(item => {
            if (formaPagamento === "") {
                return "##,##"; // Retornar algum indicativo de erro ou valor não calculado
            } else if (item.Produto.Preco.DinPix !== item.Produto.Preco.Cart) {
                valoresIguais = false; // Há diferença de preços
            }
    
            // Adicionar ao valor total baseado em DinPix se não houver diferença ou se for escolhido DinPix/Pix
            if (formaPagamento === "Dim" || formaPagamento === "Pix" || valoresIguais) {
                valorTotal += item.Quantidade * item.Produto.Preco.DinPix;
            } else if (formaPagamento === "Cart") {
                valorTotal += item.Quantidade * item.Produto.Preco.Cart;
            }
        });
    
        // Se todos os preços forem iguais ou se a forma de pagamento for DinPix ou Pix, calcular com DinPix
        if (valoresIguais || formaPagamento === "Dim" || formaPagamento === "Pix") {
            return valorTotal !== 0 ? valorTotal.toFixed(2) : "##,##";
        } else {
            return "##,##"; // Retornar algum indicativo de erro ou valor não calculado
        }
    };
    
    ObterItens=()=>{return this.TodosOsItens}
    
    salvarNoBrowser = () => {
        localStorage.setItem(LocalStorageName, JSON.stringify(this.TodosOsItens.map((item) => {
            console.log(item)
            if (item.Produto===undefined) {
                return {
                    tipo: "Combo",
                    id: item.Id,
                    itensSelecionaveis: item.Selecionados
                };
            } else {
                return {
                    tipo: "ProdutoCarinho",
                    id: item.Produto.Id,
                    classe: item.Produto.Classe,
                    quantidade: item.Quantidade
                };
            }
        })));
    }
    obterDoBrowser = () => {
        this.TodosOsItens = [];
        const dadosCarrinho = localStorage.getItem(LocalStorageName);
        if (dadosCarrinho && dadosCarrinho !== "") {
            const itens = JSON.parse(dadosCarrinho);
            itens.forEach((item) => {
                if (item.tipo === "Combo") {
                    this.TodosOsItens.push(new ComboNoCarrinho(
                        item.id,
                        item.itensSelecionaveis
                    ));
                } else if (item.tipo === "ProdutoCarinho") {
                    this.TodosOsItens.push(new ProdutoCarinho(
                        item.id,
                        item.classe,
                        item.quantidade
                    ));
                }
            });
        }
    }
    
}
const CarrinhoControlerInstance = new CarrinhoControler();
export default CarrinhoControlerInstance;