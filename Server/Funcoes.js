const path = require('path');
const multer = require('multer');

// Caminho para o arquivo JSON
const DATA_FILE = path.join(__dirname, 'DataBaseLocal', 'Produtos.json');
const fs = require('fs');

const Eo_Response_Express=(res)=>{return res.send && res.status && res.json}

// Codigo de acesso Gerado a cada vez que o server é iniciado
const GerarCodigoAcesso=()=>{
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/*-+.,!@#$%&*()=';
    let codigo = '';
    for (let i = 0; i < 25; i++) { // Código de 10 caracteres alfanuméricos
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
}
let Codigo_de_Acesso_de_Hoje=GerarCodigoAcesso()
// Função para ler e processar o arquivo JSON
const lerArquivoJSON = (callback) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      try {
        const jsonData = JSON.parse(data);
        callback(null, jsonData);
      } catch (error) {
        callback(error, null);
      }
    }
  });
};
const salvarProdutosJSON = (produtos, callback) => {
    fs.writeFile(DATA_FILE, JSON.stringify(produtos, null, 2), (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
};
  
/*                  FUNÇÕES LADO CLIENTE                */
/*           FUNÇÕES GET           */
exports.Obter_Produtos_Por_Categoria = (req,res_CallBack) => {
    const{Categ}=req.query
    categoria=(Categ=="Carvao"||Categ=="Aluminio")?"Carvao_Aluminio":Categ
    lerArquivoJSON((err, data) => {
        if(Eo_Response_Express(res_CallBack)){
                res_CallBack.json(data.filter((Valor,Index)=>Valor.CATEGORIA==categoria))
            }else{
                res_CallBack(data.filter((Valor,Index)=>Valor.CATEGORIA==categoria))
            }
        })
    return false;
};
exports.Obter_Produtos_Da_Mesma_Marca=(req,res)=>{
    const { Marca, Id } = req.query;
    this.Obter_Produtos_Por_Categoria(req,(Data)=>{
        res.json(Data.filter((Valor) =>{
            return Valor.ID != Id && Valor.MARCA === Marca}
        ));
    })
}
exports.Obter_Produtos_Relativos=(req,res)=>{
    const { Sabor_Especificacao, Id } = req.query;
    this.Obter_Produtos_Por_Categoria(req,(Data)=>{
        res.json(Data.filter((Valor, index) => {
            return Valor.ID!==Id && Valor.CATEGORIA=="Essencia" && (
                Valor.SABOR.toLowerCase().split(" ").every(
                    SaborTeste=>Sabor_Especificacao.toLowerCase().split(" ").includes(SaborTeste))
            ) || false}
        ));
    })
}
exports.Obter_Produto_Por_Id=(req,res)=>{
    const{Id}=req.query
    lerArquivoJSON((err,data)=>{
        res.json(data[Id])
    })
}

exports.Obter_Por_Pesquisa=(req,res)=>{
    const {Busca}=req.query
    lerArquivoJSON((err,data)=>{
        res.status(200).json(data.filter((Valor,Index)=>{
            let GetMarca=Valor.MARCA.toLowerCase()
            let GetSabor=Valor.SABOR.toLowerCase()
            let GetCor=Valor.COR.toLowerCase()
            let GetEspecificacao=Valor.ESPECIFICACAO.toLowerCase()
            let GetNome=Valor.NOME.toLowerCase()
            let BuscaLwC=Busca.toLowerCase()
            return GetMarca.includes(Busca.BuscaLwC) ||
                GetSabor.split(" ").every(e=>e.includes(BuscaLwC)) ||
                GetCor.includes(BuscaLwC) ||
                GetEspecificacao.includes(BuscaLwC) ||
                GetNome.split(" ").every(e=>e.includes(BuscaLwC))
        }))
    })
}
/* NÃO TERA FUNÇÕES DELETE, POIS O DB SE BASEIA NA LISTA RAIZ */

/*                    FUNÇÕES LADO ADM                   */
/*           FUNÇÕES GET           */
exports.Obter_Todos_Os_Produtos=(req,res)=>{
    lerArquivoJSON((err,data)=>{
        res.json(data)
    })
}

/*           FUNÇÕES POST           */
exports.AdicionarProduto = (req, res) => {
    const { Categoria, Cor, Descricao, Especificacao, Intensidades, Marca, Nome, Quantidade, Sabor, Valor, Imagem } = req.body;
    const File=req.file
    lerArquivoJSON((err, produtos) => {
        if (err) { return res.status(500).json({ message: 'Erro interno ao ler o arquivo JSON' });}

        // Cria o novo produto
        const novoProduto = {
            "ID":produtos.length,
            "CATEGORIA":Categoria,
            "COR":Cor,
            "DESCRIÇÃO":Descricao,
            "ESPECIFICACAO": Especificacao,
            "INTENSIDADES":Intensidades,
            "MARCA":Marca,
            "NOME":Nome,
            "QUANTIDADE":Quantidade,
            "SABOR":Sabor,
            "VALOR":Valor,
            "IMAGEM": File ? File.path: "ImagensBanco\\ImagemExVazia.png" // Salva o caminho da imagem
        };
        // Adiciona o novo produto à lista de produtos
        produtos.push(novoProduto);
        // Salva a lista atualizada de produtos de volta no arquivo JSON
        salvarProdutosJSON(produtos, (err) => {
            if (err) {
            return res.status(500).json({ message: 'Erro interno ao salvar o arquivo JSON' });
            }
            res.status(200).json({ message: 'Produto adicionado com sucesso' });
        });
    });
};
  

/*           FUNÇÕES UPDATE           */
exports.AlterarProduto=(req,res)=>{
    const {Id, Categoria, Cor, Descricao, Especificacao, Intensidades, Marca, Nome, Quantidade, Sabor, Valor } = req.body;
    const File=req.file

    lerArquivoJSON((err, produtos) => {
        if (err) {return res.status(500).json({ message: 'Erro interno ao ler o arquivo JSON' });}
        if(req.file && produtos.findIndex(e=>e.ID==Id)!=-1){
            const Img=produtos[produtos.findIndex(e=>e.ID==Id)].IMAGEM
            if(Img!="ImagensBanco\\ImagemExVazia.png"){
                fs.unlink(Img, (err) => {});
            }
        }
        const novoProduto = {
            "ID":Id,
            "CATEGORIA":Categoria,
            "COR":Cor,
            "DESCRIÇÃO":Descricao,
            "ESPECIFICACAO": Especificacao,
            "INTENSIDADES":Intensidades,
            "MARCA":Marca,
            "NOME":Nome,
            "QUANTIDADE":Quantidade,
            "SABOR":Sabor,
            "VALOR":Valor,
            "IMAGEM": File ? File.path: "ImagensBanco\\ImagemExVazia.png" // Salva o caminho da imagem
        };
        produtos[produtos.findIndex(e=>e.ID==Id)]=(novoProduto)
        
        salvarProdutosJSON(produtos, (err) => {
            if (err) {
            return res.status(500).json({ message: 'Erro interno ao salvar o arquivo JSON' });
            }
            res.status(200).json({ message: 'Produto Atualizado com sucesso' });
        });
    });

}

/* NÃO TERA FUNÇÕES DELETE, POIS O DB SE BASEIA NA LISTA RAIZ */

/*           FUNÇÃO DE VERIFICAÇÃO DO LOGIN ADM            */
exports.VerificarConta=(req,res)=>{
    const {Email,Senha} = req.body
    if(Email=="" || Email==undefined || Email.toLowerCase()!="emailteste123@teste.com"){
        return res.status(401).json({msg:"Email Incorreto"})
    }
    if(Senha=="" || Senha==undefined || Senha!="Senha@Senha0123"){
        return res.status(401).json({msg:"Senha Incorreta"})
    }
    return res.status(200).json({CodigoAcesso:Codigo_de_Acesso_de_Hoje})
}

exports.VerificarAcessKey=(req,res,next)=>{
    const chaveDeAcesso = req.headers.authorization;
    if (!chaveDeAcesso || chaveDeAcesso !== `Bearer ${Codigo_de_Acesso_de_Hoje}`) {
        return res.status(401).json({ mensagem: 'Acesso não autorizado.' });
    }
    next();
}

// Reseta o Codigo de acesso a cada 24h
setInterval(() => {Codigo_de_Acesso_de_Hoje = GerarCodigoAcesso();}, 24 * 60 * 60 * 1000);