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
            let TodosOsItens = [
                ...data.ESSENCIAS,
                ...(data.CARVAO || []),
                ...(data.ALUMINIO || []),
                ...data.ACESSORIOS
            ];
            return TodosOsItens;
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
            let TodosOsItens = [
                ...data.ESSENCIAS,
                ...(data.CARVAO || []),
                ...(data.ALUMINIO || []),
                ...data.ACESSORIOS
            ];
            return TodosOsItens;
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
            let TodosOsItens = [
                ...data.ESSENCIAS,
                ...(data.CARVAO || []),
                ...(data.ALUMINIO || []),
                ...data.ACESSORIOS
            ];
            return TodosOsItens;
        });
    };
}
const AdmControlerInstance = new AdmControler();
export default AdmControlerInstance;