import { Produto } from "./Classes"
var CaminhoAcessoApi="http://localhost:5000"

const TransformarRetorno=(data)=>{
    var NovoProduto=new Produto()
    NovoProduto.Categoria=data.CATEGORIA
    NovoProduto.Cor=data.COR
    NovoProduto.Descricao=data.DESCRIÇÃO
    NovoProduto.Especificacao=data.ESPECIFICACAO
    NovoProduto.ID=data.ID
    NovoProduto.Imagem=data.IMAGEM
    NovoProduto.Intensidades=data.INTENSIDADES
    NovoProduto.Marca=data.MARCA
    NovoProduto.Nome=data.NOME
    NovoProduto.Quantidade=data.QUANTIDADE
    NovoProduto.Sabor=data.SABOR
    NovoProduto.Valor={
        "DinPix":data.VALOR.DinPix,
        "Cart":data.VALOR.Cart
    };
   return NovoProduto
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
            return data.map((Valor) => TransformarRetorno(Valor));
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
            return data.map((Valor) => TransformarRetorno(Valor));
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
            return data.map((Valor) => TransformarRetorno(Valor));
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

    ObterItemByIndex=(Id)=>{
        return fetch(`${CaminhoAcessoApi}/Produtos?Id=${Id}`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao obter produtos, Class:{RealClass} Id:${Id}`);
            }
            return response.json();
        })
        .then(data => {
            return TransformarRetorno(data)
        });
    }

    ObterItemDaMarca=(Produto)=>{
        return fetch(`${CaminhoAcessoApi}/OutrosMarca?Categ=${Produto.Categoria}&Marca=${Produto.Marca}&Id=${Produto.Id}`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter produtos');
            }
            return response.json();
        })
        .then(data => {
            return data.map(data=>TransformarRetorno(data))
        });
    }

    ObterItemRelevantes = (Produto) => {
        const Busca=(Produto.Categoria==="Essencia" && Produto.Sabor) ||
            (Produto.Categoria==="Acessorio" && Produto.Especificacao) ||
            Produto.Nome
        return fetch(`${CaminhoAcessoApi}/Relativos?Categ=${Produto.Categoria}&Sabor_Especificacao=${Busca}&Id=${Produto.ID}`,{
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter produtos');
            }
            return response.json();
        })
        .then(data => {
            return data.map(data=>TransformarRetorno(data))
        });
    }; 
}
const CatalogoControlerInstance = new CatalogoControler();
export default CatalogoControlerInstance;