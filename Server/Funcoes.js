const path = require('path');
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

// Função para obter produtos por categoria
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
exports.Obter_Todos_Os_Produtos=(req,res)=>{

}
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