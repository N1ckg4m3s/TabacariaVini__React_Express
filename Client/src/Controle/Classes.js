export class Produto{
    ID=0;
    Categoria="";
    Descricao="";
    Sabor="";
    Imagem="";
    Marca="";
    Nome="";
    Quantidade=true;
    Valor={
        "DinPix":0,
        "Cart":0
    };
    Cor="";
    Especificacao="";
    Intensidades={
        'Doce':0,
        'Gelada':0,
        'Citrica':0,
        'Mentolada':0,
        'Quente':0
    };
    ParaMensagem(Quantas){
        return `  • ${Quantas} | ${this.Marca}: ${this.Nome}`
    }
}

export class ProdutoCarinho{
    Produto={
        Classe:"",
        Id:0,
    };
    Quantidade=0
    constructor(Id, Classe, Quantidade){
        this.Produto={
            Classe:Classe,
            Id:Id,
        };;
        this.Quantidade=Quantidade
    }
}

export class Carrinho{
    ItensNoCarrinho=[]
    ValorTotal=0;
    Pagamento={
        'Dinh':false,
        'Cart':false,
        'Pix':false,
    }
}