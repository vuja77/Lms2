import "./LoadingScreen.scss";
import Logo from "./img/logo.svg";
function LoadingScreen () {
    return (
        <div className="Loading">
            <img src={Logo} alt="" />
        </div>
    )
}
export default LoadingScreen;