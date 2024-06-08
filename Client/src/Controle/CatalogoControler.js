import { Essencia,Carvao,Aluminio,Acessorio } from "./Classes"
var CaminhoAcessoApi="http://localhost:5000"

const TransformarRetorno=(Classe,data)=>{
    switch(Classe){
        case "Essencia":
            return new Essencia(data.Id,
                    {
                        "DinPix":data.Valor,
                        "Cart":data.Valor
                    },
                    data.Tem,data.Marca,data.Sabor,data.Nome,
                    data.ValorPac||999999,data.Descricao,
                    data.Intencidades||{},data.Imagem)

        case "Carvao":
            return new Carvao(
                data.Id,
                {
                    "DinPix":data.Valor,
                    "Cart":data.Valor
                },
                data.Tem,data.Marca,data.Nome,data.Descricao,data.Imagem)

        case "Aluminio":
            return new Aluminio(data.Id,
                {
                    "DinPix":data.Valor,
                    "Cart":data.Valor
                },
                data.Tem,data.Marca,data.Nome,data.Descricao,data.Imagem)

        case "Acessorio":
            return new Acessorio(data.Id,
                {
                    "DinPix":data.Valor,
                    "Cart":data.Valor
                }
                ,data.Cor,data.Marca,data.Especificacao,data.Tem,data.Descricao,data.Imagem)

        default:
            console.log("Default",Classe)
            break;
        }
}

class CatalogoControler{
    TodosOsItens=[];
    ObterCategoriaEssencias = () => {
        return fetch(`${CaminhoAcessoApi}/Produtos?Categ=Essencia`, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter produtos');
            }
            return response.json();
        })
        .then(data => {
            return data.map((A,I) => new Essencia(I,
                A.Valor,A.Tem,A.Marca,A.Sabor,A.Nome,
                A.ValorPac||999999,A.Descricao,
                A.Intencidades||{},A.Imagem
            ));
        });
    };

    ObterCategoriaCarvao_Aluminio=()=>{
        return fetch(`${CaminhoAcessoApi}/Produtos?Categ=Carvao_Aluminio`, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter produtos');
            }
            return response.json();
        })
        .then(data => {
            return data.map((A,I) => {
                if(A instanceof Carvao){
                    return new Carvao(I,A.Preco,A.Tem,A.Marca,A.Nome,A.Descricao,A.Imagem)
                }else{
                    return new Aluminio(I,A.Valor,A.Tem,A.Marca,A.Nome,A.Descricao,A.Imagem)
                }
            });
        });
    }

    ObterCategoriaAcessorios=()=>{
        return fetch(`${CaminhoAcessoApi}/Produtos?Categ=Acessorio`, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter produtos');
            }
            return response.json();
        })
        .then(data => {
            return data.map((A,I) => new Acessorio(I,A.Valor,A.Cor,A.Marca,A.Especificacao,A.Tem,A.Descricao,A.Imagem));
        });
    }

    FiltrarPorPesquisa=()=>{}

    FiltrarPorFiltro=()=>{}

    AdicionarProduto=(Valor)=>{
        fetch(`${CaminhoAcessoApi}/Produtos`, {
            method: 'POST',
            body:{Valor}
        })
    }

    AtualizarProduto=()=>{}

    ObterItemByIndex=(Class,Id)=>{
        var RealClass=isNaN(Number(Class))?Class:Id
        var RealId=isNaN(Number(Class))?Id:Class

        return fetch(`${CaminhoAcessoApi}/Produtos?Categ=${RealClass}&Id=${RealId}`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao obter produtos, Class:${RealClass} Id:${RealId}`);
            }
            return response.json();
        })
        .then(data => {
            return TransformarRetorno(RealClass,data)
        });
    }

    ObterItemDaMarca=(Produto)=>{
        return fetch(`${CaminhoAcessoApi}/OutrosMarca?Categ=${Produto.constructor.name}&Marca=${Produto.Marca}&Id=${Produto.Id}`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter produtos');
            }
            return response.json();
        })
        .then(data => {
            return data.map(data=>TransformarRetorno(Produto.constructor.name,data))
        });
    }

    ObterItemRelevantes = (Produto) => {
        return fetch(`${CaminhoAcessoApi}/Relativos?Categ=${Produto.constructor.name}&Sabor_Especificacao=${Produto.Sabor || Produto.Especificacao || Produto.Nome}&Id=${Produto.Id}`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter produtos');
            }
            return response.json();
        })
        .then(data => {
            return data.map(data=>TransformarRetorno(Produto.constructor.name,data))
        });
    }; 
}
const CatalogoControlerInstance = new CatalogoControler();
export default CatalogoControlerInstance;