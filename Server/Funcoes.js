const path = require('path');
const multer = require('multer');

// Caminho para o arquivo JSON
const DATA_FILE = path.join(__dirname, 'DataBaseLocal', 'Produtos.json');
const fs = require('fs');

const Eo_Response_Express=(res)=>{return res.send && res.status && res.json}

// Função para ler e processar o arquivo JSON
const lerArquivoJSON = (callback) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error("Erro ao ler arquivo JSON:", err);
      callback(err, null);
    } else {
      try {
        const jsonData = JSON.parse(data);
        callback(null, jsonData);
      } catch (error) {
        console.error("Erro ao fazer parse do JSON:", error);
        callback(error, null);
      }
    }
  });
};
const salvarProdutosJSON = (produtos, callback) => {
    fs.writeFile(DATA_FILE, JSON.stringify(produtos, null, 2), (err) => {
      if (err) {
        console.error("Erro ao salvar arquivo JSON:", err);
        callback(err);
      } else {
        console.log("Arquivo JSON atualizado com sucesso");
        callback(null);
      }
    });
};
  
/*                  FUNÇÕES LADO CLIENTE                */
/*           FUNÇÕES GET           */
exports.Obter_Produtos_Por_Categoria = (req,res_CallBack) => {
    const{Categ}=req.query
    categoria=(Categ=="Carvao"||Categ=="Aluminio")?"Carvao_Aluminio":Categ
    lerArquivoJSON((err, data=[]) => {
        if(Eo_Response_Express(res_CallBack)){
            res_CallBack.json(data.filter((Valor,Index)=>(Valor.CATEGORIA==categoria&&{...Valor, Id: Index})))
            }else{
                res_CallBack(data.filter((Valor,Index)=> Valor.CATEGORIA==categoria&&{...Valor, Id: Index}))
            }
        })
    return false;
};
exports.Obter_Produtos_Da_Mesma_Marca=(req,res)=>{
    const { Marca, Id } = req.query;
    this.Obter_Produtos_Por_Categoria(req,(Data)=>{
        res.json(Data.filter((Valor, index) =>
            Valor.MARCA === Marca && index != Id
        ));
    })
}
exports.Obter_Produtos_Relativos=(req,res)=>{
    const { Sabor_Especificacao, Id } = req.query;
    this.Obter_Produtos_Por_Categoria(req,(Data)=>{
        res.json(Data.filter((Valor, index) =>{
            return index!==Id && Valor.CATEGORIA=="Essencia" && (
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
        console.log("ADD produto 3")
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
    console.log("Alterar produto")

    lerArquivoJSON((err, produtos) => {
        if (err) {return res.status(500).json({ message: 'Erro interno ao ler o arquivo JSON' });}
        console.log("Id:",Id)
        if(req.file && produtos.findIndex(e=>e.ID==Id)!=-1){
            console.log("Devo alterar a imagem")
            const Img=produtos[produtos.findIndex(e=>e.ID==Id)].IMAGEM
            if(Img!="ImagensBanco\\ImagemExVazia.png"){
                console.log("é diferente")
                fs.unlink(Img, (err) => {
                    if (err) {console.error('Erro ao excluir imagem antiga:', err);}
                });
            }
        }
        console.log("To por aqui")
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
        console.log(novoProduto)
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