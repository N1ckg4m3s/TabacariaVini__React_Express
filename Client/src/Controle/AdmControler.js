import { Produto } from "./Classes"

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
var CaminhoAcessoApi="http://localhost:5000"
class AdmControler{
    ObterItensSistema = () => {
        return fetch(`${CaminhoAcessoApi}/Adm`, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {throw new Error('Erro ao obter produtos');}
            return response.json();
        })
        .then(data => {
            return data.map(data=>TransformarRetorno(data))
        });
    };
    ObterPromos = () => {
        return fetch(`${CaminhoAcessoApi}/Adm`, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {throw new Error('Erro ao obter produtos');}
            return response.json();
        })
        .then(data => {
            // EM PRODUÇÃO
        });
    };
    ObterItensAtualizados = () => {
        return fetch(`${CaminhoAcessoApi}/Adm`, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {throw new Error('Erro ao obter produtos');}
            return response.json();
        })
        .then(data => {
            // EM PRODUÇÃO
        });
    };

    AdicionarItem = (Produto) => {
        console.log(Produto)
        fetch(`${CaminhoAcessoApi}/Adm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Categoria: Produto.Categoria,
            Cor: Produto.Cor,
            Descricao: Produto.Descricao,
            Especificacao: Produto.Especificacao,
            Imagem: Produto.Imagem,
            Intensidades: Produto.Intensidades,
            Marca: Produto.Marca,
            Nome: Produto.Nome,
            Quantidade: Produto.Quantidade,
            Sabor: Produto.Sabor,
            Valor: Produto.Valor,
          }),
        })
        .then(response => {
          if (!response.ok) {throw new Error('Erro ao adicionar produto')}
          return response.json();
        })
        .then(data => {
          console.log('Produto adicionado com sucesso:', data);
        })
        .catch(error => {
          console.error('Erro ao adicionar produto:', error);
        });
      };
    AtualizarItem=(Id,Produto)=>{
        console.log("Alterar")
        fetch(`${CaminhoAcessoApi}/Adm`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: Id,
                Categoria: Produto.Categoria,
                Cor: Produto.Cor,
                Descricao: Produto.Descricao,
                Especificacao: Produto.Especificacao,
                Imagem: Produto.Imagem,
                Intensidades: Produto.Intensidades,
                Marca: Produto.Marca,
                Nome: Produto.Nome,
                Quantidade: Produto.Quantidade,
                Sabor: Produto.Sabor,
                Valor: Produto.Valor,
            }),
        })
    }
}
const AdmControlerInstance = new AdmControler();
export default AdmControlerInstance;