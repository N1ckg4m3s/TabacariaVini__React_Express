import React, { useEffect, useMemo, useState } from "react";
import { ReactComponent as Certo } from "./Imagens/Certo.svg";
import "./Style.css";

function FiltroEssencias({ Itens, CallBack }) {
    const TipoEssencias = useMemo(() => ["Citrica", "Doce", "Gelada", "Menta", "Quente"], []);

    const [PrefEssencia, setPrefEssencia] = useState(() => {
        const initialEssencias = {};
        TipoEssencias.forEach((essencia) => {
            initialEssencias[essencia] = true;
        });
        return initialEssencias;
    });

    const [PrefMarca, setPrefMarca] = useState(() => {
        if (Array.isArray(Itens)) {
            const uniqueMarcas = [...new Set(Itens.map(item => item.Marca))];
            const initialMarcas = {};
            uniqueMarcas.forEach((marca) => {
                initialMarcas[marca] = true;
            });
            return initialMarcas;
        }
        return {};
    });

    const [Marcas, setMarcas] = useState([]);

    useEffect(() => {
        if (Array.isArray(Itens)) {
            const uniqueMarcas = [...new Set(Itens.map(item => item!==undefined && item.Marca))];
            setMarcas(
                uniqueMarcas.includes(false)?
                uniqueMarcas.slice(1):
                uniqueMarcas);
        }
    }, [Itens]);

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
        const ItensFiltrados = Itens.filter(Item =>
            PrefMarca[Item.Marca] && Item
        );
        CallBack(ItensFiltrados);
    };

    return (
        <div className="Filtro-Essencia">
            <label className="Texto-Results">Resultados: ##</label>
            <div className="Linha-Separacao" style={{ width: '100%', backgroundColor: 'var(--SecondNav)',height:'2px' }} />
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
            <div className="Linha-Separacao" style={{ width: '100%', backgroundColor: 'var(--SecondNav)',height:'2px' }} />
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
