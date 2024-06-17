const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Funcoes = require("./Funcoes")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Configuração do Multer para salvar arquivos na pasta "ImagensBanco"

const upload = require("./multer")

// Servir arquivos estáticos das imagens
app.use('/ImagensBanco', express.static(path.join(__dirname, 'ImagensBanco')));

// Rota para obter todos os produtos ou por ID
app.get('/Produtos',(req,res)=>{
  const{Id}=req.query
  if(!Id){
    Funcoes.Obter_Produtos_Por_Categoria(req,res)
  }else{
    Funcoes.Obter_Produto_Por_Id(req,res)
  }
});

// Rota para obter todos os produtos da mesma marca
app.get('/OutrosMarca', Funcoes.Obter_Produtos_Da_Mesma_Marca);

// Rota para obter todos os produtos relativos a um sabor específico
app.get('/Relativos', Funcoes.Obter_Produtos_Relativos);

// Rota para obter todos os produtos do DB
app.get('/Adm',Funcoes.VerificarAcessKey, Funcoes.Obter_Todos_Os_Produtos);

// Rota para Adicionar um novo produto ao DB
app.post('/Adm',Funcoes.VerificarAcessKey, upload.single("file"), Funcoes.AdicionarProduto);

// Rota para Atualizar um produto no DB
app.put('/Adm',Funcoes.VerificarAcessKey, upload.single("file"), Funcoes.AlterarProduto);


// Rota para Atualizar um produto no DB
app.post('/VerificarConta', Funcoes.VerificarConta);


// Rota para servir o frontend (React app)
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Rota default para servir o React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
