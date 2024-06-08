// IMAGENS //
import Logo1 from "./Imagens/Logo2.png"

import { ReactComponent as Face} from "./Imagens/facebook.svg"
import { ReactComponent as Whats} from "./Imagens/whatsapp.svg"
import { ReactComponent as Inst} from "./Imagens/Instagram.svg"
import { ReactComponent as Suporte} from "./Imagens/Suporte.svg"

import "./Style.css"
function FooterBar(){
    return(
        <footer>
            <div className="BoxLogo">
                <img alt="Logo" className="LogoFooterBar" src={Logo1}/>
            </div>
            <div className="IconesAcessos">
                <Suporte className="SVG-white"/>
                <Face className="SVG-white"/>
                <Whats className="SVG-white"/>
                <Inst className="SVG-white"/>
            </div>
            <div className="TextoFooter">@ViniTabacaria 2024. All rights reserved.</div>
        </footer>
    )
}
export default FooterBar