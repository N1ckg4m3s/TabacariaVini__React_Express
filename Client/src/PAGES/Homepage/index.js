// COMPONENTES IMPORTADOS  //
import FooterBar from "../../Modulos/FooterBar/Index"
import TopBar from "../../Modulos/TopBar/Index"
import ComboCard from "../../Modulos/ComboCard"

// IMAGENS //
import Fundo from "./ImagensPagina/FundoHeaderBar.png"
import Carvão from "./ImagensPagina/CarvãoAcesso.png"
import Essencia from "./ImagensPagina/Essencias.png"
import Rosh from "./ImagensPagina/Roshs.png"

// ICONS //
import {ReactComponent as Caminhao} from "./ImagensPagina/Caminão.svg"
import {ReactComponent as Point} from "./ImagensPagina/Point.svg"
import {ReactComponent as Insta} from "./ImagensPagina/Instagram.svg"
import {ReactComponent as Whats} from "./ImagensPagina/whatsapp.svg"

// REACT //
import { Link } from 'react-router-dom';

import "./Style.css"

function HomePage(){
    return(
        <>
            <TopBar TemBarraPesquisa={false}/>

            <header>
                <section>
                    <h2>
                        <span>QUALIDADE</span> e <span>CONVENIÊNCIA</span>
                        <br/>entregue direto em sua casa
                    </h2>
                    <h3>
                        Aproveite a praticidade da entrega em domicílio e
                        <br/> descubra novos sabores de tabaco.
                    </h3>
                </section>
                
                <img src={Fundo} alt=""/>
            </header>

            <div className="Cards-Acesso">
                <h4 className="TextoSection">Descubra novos aromas e encontre sua próxima essência preferida em nosso catálogo diversificado.</h4>
                <div className="Container">
                    <div className="Link-Card-Acesso">
                        <img src={Essencia} alt="Imagem de um Rosh com essencia"/>
                        <h3 style={{color:'#F4B331'}}>ESSENCIAS</h3>
                        <Link className="Link-Card-Button" to={"/Catalogo#Categoria=Essencia"}> VER PRODUTOS </Link>
                    </div>
                    <div className="Link-Card-Acesso">z
                        <img src={Carvão} alt="Carvoes Acesos"/>
                        <h3 style={{color:'#F4B331'}}>CARVÃO ALUMINIO</h3>
                        <Link className="Link-Card-Button" to={"/Catalogo#Categoria=Carvao_Aluminio"}> VER PRODUTOS </Link>
                    </div>
                    <div className="Link-Card-Acesso">
                        <img src={Rosh} alt="Imagem de um Rosh"/>
                        <h3 style={{color:'#F4B331'}}>ACESSORIOS</h3>
                        <Link className="Link-Card-Button" to={"/Catalogo#Categoria=Acessorio"}> VER PRODUTOS </Link>
                    </div>
                </div>
            </div>

            <div className="Combos-e-Sujestoes">
                <h4 className="TextoSection">Procurando por combos, promoções ou recomendação? Siga em frente com as sugestões dos nossos clientes!</h4>

                <section className="Botoes-Acesso-Pomoção">
                    <button className="Botoes-Acesso-Pomoção-Selected">COMBOS</button>
                    {/* <button>PROMOÇÕES</button>
                    <button>RECOMENDAÇÕES</button> */}
                </section>
                <div className="Linha-Separação"/>
                <div>
                    <ComboCard/>
                    {/* <SemNada/> */}
                </div>

                <div className="Linha-Separação"/>
            </div>

            <div className="EntregaRetirada">
                <h4 className="TextoSection">Retirada rápida na loja ou entrega direto para você - a escolha é sua.</h4>
                <div className="ItemEntrega">
                    <div className="Texto">
                        <h3>ENTREGA</h3>
                        <h4>
                            Segunda a Quinta (18:00 á 23:00)
                            <br/>
                            Sexta e Sabado (18:00 á 00:00)
                        </h4>
                        <h3>Apartir de: <span>3,00</span></h3>
                    </div>
                    <Caminhao className="ItemImagem"/>
                </div>
                <div className="ItemRetirada">
                    <Point className="ItemImagem"/>
                    <div className="Texto">
                        <h3>ENTREGA</h3>
                        <h4>
                            Todos os dias (12:00 á 00:00)
                        </h4>
                        <h3>Sinta-se bem vindo</h3>
                    </div>
                </div>
            </div>

            <div className="Contato">
                <h4 className="TextoSection">Caso tenha alguma dúvida, entre em contato conosco pelo WhatsApp e teremos o prazer em ajudar!</h4>
                <div className="RedesSociais">
                    <div>
                        <Whats className="IMAGEM"/>
                        <p>(11) 9 8331-7216</p>
                    </div>
                    <div>
                        <Insta className="IMAGEM"/>
                        <p>@vini_varejo_atacado_</p>
                    </div>
                </div>
            </div>

            <FooterBar/>
        </>
    );
}
export default HomePage