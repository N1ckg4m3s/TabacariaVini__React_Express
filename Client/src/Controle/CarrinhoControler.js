import { ProdutoCarinho } from "./Classes" 
const LocalStorageName="Carrinho-V1.2"
class CarrinhoControler{
    TodosOsItens=[];

    Adicionar=(Classe, Id, Quantidade)=>{
        console.log("Adicionar",Classe, Id ,Quantidade)
        this.TodosOsItens.push(new ProdutoCarinho(Classe, Id,Quantidade))
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
        localStorage.setItem(LocalStorageName,this.TodosOsItens.map((Value)=>{
            return `${Value.Quantidade}:${Value.Produto.Id}:${Value.Produto.Classe}/*/`
        }));
    }
      
    obterDoBrowser = () => {
        this.TodosOsItens=[];
        const dadosCarrinho = localStorage.getItem(LocalStorageName);
        if(dadosCarrinho&&dadosCarrinho!==""){
            const Itens=dadosCarrinho.split('/*/')
            Itens.forEach((Value)=>{
                Value=Value.replace(/,/g, '')
                if(Value!==""){
                    this.TodosOsItens.push(
                        new ProdutoCarinho(
                            Value.split(":")[2],
                            Value.split(":")[1],
                            Value.split(":")[0],
                        )
                    )
                }
            })
        }
    }
}
const CarrinhoControlerInstance = new CarrinhoControler();
export default CarrinhoControlerInstance;