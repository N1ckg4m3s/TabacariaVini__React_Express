import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Beforeunload } from 'react-beforeunload'; // Importe o componente Beforeunload
import AdmPage from './PAGES/ADM/index';
import CarrinhoPage from "./PAGES/Carrinho/index";
import CatalogoPage from "./PAGES/Catalogo/index";
import DescricaoPage from "./PAGES/Descricricao/index";
import HomePage from "./PAGES/Homepage/index";

import CarrinhoControlerInstance from './Controle/CarrinhoControler';
import ADMDescricaoPage from './PAGES/ADM_Descricricao';
import AdmLoginPage from './PAGES/ADM_Login';
import ADMComboPromocaoPage from './PAGES/ADM_Combo_Promocao';
import DescricaoComboPage from './PAGES/Descricricao_Combo';

function App() {
  return (
    <Router>
      <Beforeunload onBeforeunload={(event) => {
          CarrinhoControlerInstance.salvarNoBrowser()
        }}>
        <Routes>
          <Route path="/Adm" element={<AdmLoginPage />} />
          <Route path="/AdmItens" element={<AdmPage />} />
          <Route path="/ADMDescricao" element={<ADMDescricaoPage />} />
          <Route path="/ADMComboPromocao" element={<ADMComboPromocaoPage />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/Carrinho" element={<CarrinhoPage />} />
          <Route path="/Catalogo" element={<CatalogoPage />} />
          <Route path="/Descricao" element={<DescricaoPage />} />
          <Route path="/DescricaoCombo" element={<DescricaoComboPage />} />
        </Routes>
      </Beforeunload>
    </Router>
  );
}

export default App;

/*  PADRONIZAÇÃO DE COMMIT

<type> (Scope): Desc

FEAT: Indica uma nova funcionalidade adicionada.
FIX: Indica uma correção de bug.
DOCS: Alterações relacionadas à documentação.
STYLE: Alterações que não afetam o código de execução.
REFACTOR: Uma mudança no código que não corrige um bug nem adiciona uma funcionalidade.
TEST: Adição ou modificação de testes.
CHORE: Tarefas de build, configuração, etc.

*/