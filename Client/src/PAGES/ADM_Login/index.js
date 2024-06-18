// COMPONENTES IMPORTADOS  //
import FooterBar from "../../Modulos/FooterBar/Index"
import TopBar from "../../Modulos/TopBar/Index"

import { ReactComponent as SeePassword } from "./Imagens/Oppened_Eye.svg"
import { ReactComponent as NoSeePassword } from "./Imagens/Closed_Eye.svg"
import { ReactComponent as Arroba } from "./Imagens/ArrobaSVg.svg"

import Logo from "./Imagens/Logo2.png"

import "./Style.css"
import { useState } from "react"
function AdmLoginPage(){
    const [VerSenha,SetVerSenha]=useState(false)

    const [Email,SetEmail]=useState("")
    const [Senha,SetSenha]=useState("")
    
    const [MsgError,SetMsgError]=useState(false)

    const Entrar = async () => {
        const data = {
            "Email": Email,
            "Senha": Senha
        };
    
        try {
            const response = await fetch("http://localhost:5000/VerificarConta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {throw new Error('Erro ao verificar conta');}
            const responseData = await response.json();
            localStorage.setItem("TodayAccessKey",responseData.CodigoAcesso)
            window.location.href="/AdmItens"
        } catch (error) {
            SetMsgError(true);
        }
    };
    

    return(
        <>
            <TopBar/>
            <div className="CorpoPagina"  style={{alignItems:'center',justifyContent:'center'}}>
                <div className="LoginFrame">
                    <img src={Logo} alt=""/>
                    <h5>Painel de administração</h5>
                    <div>
                        <h5>acesso</h5>
                        <Arroba className="IconeInput"/>
                        <input
                            value={Email}
                            onChange={(e)=>SetEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <h5>senha</h5>
                        {!VerSenha ?  
                            <SeePassword
                                className="IconeInput OlhoSee"
                                onClick={()=>{SetVerSenha(true)}}
                            />
                            :
                            <NoSeePassword
                                className="IconeInput OlhoClose"
                                onClick={()=>{SetVerSenha(false)}}
                            />
                        }
                        <input type={!VerSenha?"password":"text"}
                            value={Senha}
                            onChange={(e)=>SetSenha(e.target.value)}
                        />
                    </div>

                    <button onClick={()=>Entrar()}> ENTRAR </button>

                    <h4>{MsgError?"Email ou Senha incorreto":""}</h4>
                </div>
            </div>
            <FooterBar/>
        </>
    )
}
export default AdmLoginPage