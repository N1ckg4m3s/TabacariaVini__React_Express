export class Essencia{
    Id=null;
    Preco={ // Valor tanto em Din, Pix e Cartao caso diferença
        'DinPix':0,
        'Cart':0
    };
    Tem=false; // Quantas unidades tem no sistema
    Marca=""; // Marca da Essencia
    Sabor=""; // Sabor da Essencia
    Nome=""; // Nome na caixinha
    ValorPac=0; // Valor no pac (10unids)

    Imagem="";

    Descricao="";
    Intensidades={
        'doce':0,
        'gelada':0,
        'citrica':0,
        'mentolada':0,
        'quente':0,
    };

    constructor(Id,Preco,Tem,Marca,Sabor,Nome,Pac, Desc, Intensidades,Imagem){
        this.Id=Id;
        this.Preco=Preco;
        this.Tem=Tem;
        this.Marca=Marca;
        this.Sabor=Sabor;
        this.Nome=Nome;
        this.ValorPac=Pac;
        this.Descricao=Desc;
        this.Intensidades=Intensidades;
        this.Imagem=Imagem
    }

    ParaMensagem(Quantas){
        return `  • ${Quantas} | ${this.Marca}: ${this.Nome}`
    }
}

export class Carvao{
    Id=null;
    Preco={ // Valor tanto em Din, Pix e Cartao caso diferença
        'DinPix':0,
        'Cart':0
    }; // Valor da unidade
    Tem=false; // Quantas unidades tem no sistema
    Marca=""; // Marca do Carvao
    Nome="";
    Descricao="";

    Imagem="";

    constructor(Id,Preco,Tem,Marca,Nome,Desc,Imagem){
        this.Id=Id;
        this.Preco={
            'DinPix':Preco,
            'Cart':Preco
        };
        this.Tem=Tem;
        this.Marca=Marca;
        this.Nome=Nome;
        this.Descricao=Desc;
        this.Imagem=Imagem
    }

    ParaMensagem(Quantas){
        return `  • ${Quantas} | ${this.Marca}: ${this.Nome}`
    }
}

export class Aluminio{
    Id=null;
    Preco={ // Valor tanto em Din, Pix e Cartao caso diferença
        'DinPix':0,
        'Cart':0
    }; // Valor da unidade
    Tem=false; // Quantas unidades tem no sistema
    Marca=""; // Marca do Carvao
    Nome="";
    Descricao="";

    Imagem="";

    constructor(Id,Preco,Tem,Marca,Nome,Desc,Imagem){
        this.Id=Id;
        this.Preco={
            'DinPix':Preco,
            'Cart':Preco
        };
        this.Tem=Tem;
        this.Marca=Marca;
        this.Nome=Nome;
        this.Descricao=Desc;
        this.Imagem=Imagem
    }

    ParaMensagem(Quantas){
        return `  • ${Quantas} | ${this.Marca}: ${this.Nome}`
    }
}

export class Acessorio{
    Id=null;
    Preco={ // Valor tanto em Din, Pix e Cartao caso diferença
        'DinPix':0,
        'Cart':0
    };;
    Cor="";
    Marca="";
    Especificacao="";
    Tem=false;
    Descricao="";

    Imagem="";

    constructor(Id,Preco,Cor,Marca,Esp,Tem,Desc,Imagem){
        this.Id=Id;
        this.Preco={
            'DinPix':Preco,
            'Cart':Preco
        };
        this.Cor=Cor;
        this.Marca=Marca;
        this.Especificacao=Esp;
        this.Tem=Tem;
        this.Descricao=Desc;
        this.Imagem=Imagem
    }

    ParaMensagem(Quantas){
        return `  • ${Quantas} | ${this.Especificacao} ${this.Marca}: ${this.Cor} ?`
    }
}

export class Combos{
    Id=null;
    Produtos=[]; // Lista de itens e quantidade
    Preco={ // Valor tanto em Din, Pix e Cartao caso diferença
        'DinPix':0,
        'Cart':0
    };
    constructor(Id,Produtos,Preco){
        this.Id=Id;
        this.Preco=Preco;
        this.Produtos=Produtos
    }
}

export class Promocao{
    Id=null;
    Produto=null;
    Preco={ // Valor tanto em Din, Pix e Cartao caso diferença
        'DinPix':0,
        'Cart':0
    };
    constructor(Id,Produtos,Preco){
        this.Id=Id;
        this.Preco=Preco;
        this.Produtos=Produtos
    }
}

export class PromocaoNoCarinho{
    Promocao=null;
    Quantidade=0;
    constructor(Promo, Quant){
        this.Promocao=Promo;
        this.Quantidade=Quant;
    }
}
export class ComboNoCarinho{
    Combo=null;
    ItensEscolhidos=[];
    constructor(Promo, Quant, Itens){
        this.Combo=null;
        this.Quantidade=Quant;
        this.ItensEscolhidos=Itens
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