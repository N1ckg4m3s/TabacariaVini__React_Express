// IMAGENS //
import Logo1 from "./Imagens/Logo2.png"

// ICONES //
import { ReactComponent as Carrinho } from './Imagens/Carrinho.svg';
import { ReactComponent as Menu } from './Imagens/Menu.svg';
import { ReactComponent as SendSing } from './Imagens/SetaEnviar.svg';
import { ReactComponent as Lupa } from './Imagens/Lupa.svg';

// REACT //
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

import "./Style.css"

function TopBar(Props){
    const [TextoPesquisa,SetTextoPesquisa]=useState("")
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [MenuAberto,SetMenuAberto]=useState(false)
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const Pesquisar=()=>{
        if(TextoPesquisa!==""){
            window.location.href=`/Catalogo?Busca=${TextoPesquisa}`
        }
    }

    return(
        <nav>
            <div className="BarraPrincipal">
                <Link to={"/"}>
                    <img className="LogoTopBar" alt="" src={Logo1}/>
                </Link>
                {(windowWidth>880 || (MenuAberto && windowWidth<=880)) && 
                    <div className="LinksAcesso">
                        <Link className="Link" to={"/Catalogo#Categoria=Essencia"}>ESSENCIAS</Link>
                        <Link className="Link" to={"/Catalogo#Categoria=Carvao_Aluminio"}>CARVOES/ALUMINIO</Link>
                        <Link className="Link" to={"/Catalogo#Categoria=Acessorio"}>ACESSORIOS</Link>
                    </div>
                }
                <div className="AtalhoBotoes">
                    <Link className="Link BotaoCarrinho" to={"/Carrinho"}>
                        <Carrinho className="SVG-white"/>
                    </Link>
                    <button className="MenuButton" onClick={()=>SetMenuAberto(!MenuAberto)}>
                        <Menu className="SVG-white"/>
                    </button>
                </div>
            </div>
            {Props.TemBarraPesquisa &&(
                <div className="BarraSecundaria">
                    <section>
                        <Lupa className="SVG-white Lupa"/>
                        <input
                            value={TextoPesquisa}
                            placeholder="..."
                            type="Text"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    Pesquisar();
                                }
                            }}
                            onChange={(e)=>{SetTextoPesquisa(e.target.value)}}
                        />
                        <SendSing
                            onClick={()=>Pesquisar()}
                            className="SVG-white SendSing"
                        />
                    </section>
                </div>
            )}
        </nav>
    )
}
export default TopBar