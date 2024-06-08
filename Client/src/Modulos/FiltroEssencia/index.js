import React, { useEffect, useState} from "react";
import { ReactComponent as Certo } from "./Imagens/Certo.svg";
import "./Style.css";

function FiltroEssencias({ Itens = [] }) {
    const TipoEssencias = ["Citrica", "Doce", "Gelada", "Menta", "Quente"];

    const [PrefEssencia, setPrefEssencia] = useState({});
    const [PrefMarca, setPrefMarca] = useState({});
    const [Marcas, setMarcas] = useState([]);

    useEffect(() => {
        // Inicializar estados de essências com true
        const initialEssencias = {};
        TipoEssencias.forEach((essencia) => {
            initialEssencias[essencia] = true;
        });
        setPrefEssencia(initialEssencias);

        // Obter marcas dos itens
        if (Array.isArray(Itens)) {
            const uniqueMarcas = [...new Set(Itens.map(item => item.Marca))];
            setMarcas(uniqueMarcas);

            // Inicializar estados de marcas com true
            const initialMarcas = {};
            uniqueMarcas.forEach((marca) => {
                initialMarcas[marca] = true;
            });
            setPrefMarca(initialMarcas);
        }
    }, [Itens]); // Dependência correta: Itens

    const handleEssenciaChange = (essencia) => {
        setPrefEssencia((prev) => ({
            ...prev,
            [essencia]: !prev[essencia]
        }));
    };

    const handleMarcaChange = (marca) => {
        setPrefMarca((prev) => ({
            ...prev,
            [marca]: !prev[marca]
        }));
    };

    const Filtrar = () => {
        // Implementar a lógica de filtro conforme necessário
        console.log("Preferências de Essências:", PrefEssencia);
        console.log("Preferências de Marcas:", PrefMarca);
        // CallBack({ PrefEssencia, PrefMarca });
    };

    return (
        <div className="Filtro-Essencia">
            <label className="Texto-Results">Resultados: ##</label>
            <div className="Linha-Separacao" style={{ width: '100%', backgroundColor: 'var(--SecondNav)' }} />
            <label className="SubTextos">Preferencia de essencia</label>
            <div className="ItensCheckbox">
                {TipoEssencias.map((value, index) => (
                    <div key={index}>
                        <div><Certo /></div>
                        <input
                            checked={PrefEssencia[value]}
                            type="checkbox"
                            onChange={() => handleEssenciaChange(value)}
                        />
                        <label>{value}</label>
                    </div>
                ))}
            </div>
            <div className="Linha-Separacao" style={{ width: '100%', backgroundColor: 'var(--SecondNav)' }} />
            <label className="SubTextos">Preferencia de marca</label>
            <div className="ItensCheckbox">
                {Marcas.map((value, index) => (
                    <div key={index}>
                        <div><Certo /></div>
                        <input
                            checked={PrefMarca[value]}
                            type="checkbox"
                            onChange={() => handleMarcaChange(value)}
                        />
                        <label>{value}</label>
                    </div>
                ))}
            </div>
            <div className="Linha-Separacao" style={{ width: '100%', backgroundColor: 'var(--SecondNav)' }} />
            <button onClick={Filtrar}>Filtrar</button>
        </div>
    );
}

export default FiltroEssencias;