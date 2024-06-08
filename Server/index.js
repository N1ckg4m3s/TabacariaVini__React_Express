const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Caminho para o arquivo JSON
const DATA_FILE = path.join(__dirname, 'DataBaseLocal', 'Produtos.json');

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
const obterProdutosPorCategoria = (categoria, callback) => {
  lerArquivoJSON((err, data) => {
    if (err) return callback(err, null);
    let produtos;
    switch (categoria) {
      case 'Essencia':
        produtos = data.ESSENCIAS.map((produto, index) => ({ ...produto, Id: index }));
        break;

      case 'Carvao_Aluminio':
        produtos = [...(data.CARVAO || []), ...(data.ALUMINIO || [])].map((produto, index) => ({ ...produto, Id: index }));
        break;

      case 'Acessorio':
        produtos = data.ACESSORIOS.map((produto, index) => ({ ...produto, Id: index }));
        break;

      default:
        return callback(new Error('Categoria inválida'), null);
    }

    callback(null, produtos);
  });
};


// Rota para obter todos os produtos ou por ID
app.get('/Produtos', (req, res) => {
  const { Categ, Id } = req.query;
  _Categ=(Categ=="Carvao"||Categ=="Aluminio")?"Carvao_Aluminio":Categ

  if (!_Categ) {
    return res.status(400).json({ error: 'Parâmetro Categ não especificado' });
  }

  obterProdutosPorCategoria(_Categ, (err, produtos) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (Id == null) {
      res.json(produtos);
    } else {
      res.json({...produtos[Id],Id:Id});
    }
  });
});

// Rota para obter todos os produtos da mesma marca
app.get('/OutrosMarca', (req, res) => {
  const { Categ, Marca, Id } = req.query;
  _Categ=(Categ=="Carvao"||Categ=="Aluminio")?"Carvao_Aluminio":Categ

  if (!_Categ) {
    return res.status(400).json({ error: 'Parâmetro Categ não especificado' });
  }

  obterProdutosPorCategoria(_Categ, (err, produtos) => {
    if (err) { return res.status(500).json({ error: `${err.message} > BatataDoce1` }) }
    const produtosFiltrados = produtos.filter((produto, index) => produto.Marca === Marca && index != Id);
    res.json(produtosFiltrados);
  });
});

// Rota para obter todos os produtos relativos a um sabor específico
app.get('/Relativos', (req, res) => {
  const { Categ, Sabor_Especificacao, Id } = req.query;
  _Categ=(Categ=="Carvao"||Categ=="Aluminio")?"Carvao_Aluminio":Categ
  if (!Categ) {
    return res.status(400).json({ error: 'Parâmetro Categ não especificado' });
  }
  obterProdutosPorCategoria(_Categ, (err, produtos) => {
    if (err) {return res.status(500).json({ error: `${err.message} > BatataDoce2` });}
    const produtosFiltrados = produtos.filter((produto) => {
      if (produto.originalIndex == Id) return false;
      switch (Categ) {
        case "Essencia":
          const saboresProduto = produto.Sabor.toLowerCase().split(" ");
          const saboresFiltro = Sabor_Especificacao.toLowerCase().split(" ");
          return saboresProduto.every(sabor => saboresFiltro.includes(sabor));

        case "Carvao":
          return false

        case "Aluminio":
          return false
          
        case "Acessorio":
          return false;

        default:
          return false;
      }
    });
    res.json(produtosFiltrados);
  });
});


// Rota para adicionar um novo produto
app.post('/Produtos', (req, res) => {
  console.log("Endpoint de POST para adicionar produtos");
  // Lógica para adicionar novo produto ao JSON
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
