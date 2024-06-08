import { useLocation } from "react-router-dom";
import "./Style.css"
function AdmPage(){
    console.log(useLocation())
    const { state } = useLocation();
    console.log(state);
    return(
        <div> ADM </div>
    )
}
export default AdmPage