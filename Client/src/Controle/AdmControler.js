import { Produto } from "./Classes"

const TransformarRetorno=(data)=>{
    var NovoProduto=new Produto()
    NovoProduto.Categoria=data.CATEGORIA
    NovoProduto.Cor=data.COR
    NovoProduto.Descricao=data.DESCRIÇÃO
    NovoProduto.Especificacao=data.ESPECIFICACAO
    NovoProduto.ID=data.ID
    NovoProduto.Imagem=data.IMAGEM
    NovoProduto.Intensidades=JSON.parse(data.INTENSIDADES)
    NovoProduto.Marca=data.MARCA
    NovoProduto.Nome=data.NOME
    NovoProduto.Quantidade=data.QUANTIDADE
    NovoProduto.Sabor=data.SABOR
    NovoProduto.Valor=JSON.parse(data.VALOR)

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
        console.log(Produto.Imagem)
        fetch(`${CaminhoAcessoApi}/Adm`, {
          method: 'POST',
          body: Produto
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
        fetch(`${CaminhoAcessoApi}/Adm`, {
            method: 'PUT',
            body: Produto
        })
        .then(response => {
          if (!response.ok) {throw new Error('Erro ao atualizar produto')}
          return response.json();
        })
        .then(data => {
          console.log('Produto atualizado com sucesso:', data);
        })
        .catch(error => {
          console.error('Erro ao atualizar produto:', error);
        });
    }
}
const AdmControlerInstance = new AdmControler();
export default AdmControlerInstance;