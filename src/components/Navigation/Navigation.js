import { Link } from "react-router-dom";
import LogoutDark from "../../images/logoutDark.svg";
import Logout from "../../images/logout.svg"

export default function Navigation({auth, name, onSignUp, isOpened, onLogout, isMain = false}) {
    if (isMain) {
        if (!auth) return (
            isOpened && <nav className="navigation">
                <Link className="navigation__element navigation__element_active" to='/'>Home</Link>
                <button onClick={() => onSignUp("signin")} className="navigation__auth-button">Sign in</button>
            </nav>
        )
        return (
            isOpened && <nav className="navigation">
                <Link className="navigation__element navigation__element_active" to='/'>Home</Link>
                <Link className="navigation__element" to='/saved-news'>Saved articles</Link>
                <button onClick={() => onLogout()} className="navigation__auth-button">{name} <img src={Logout} alt="logout"/></button>
            </nav>
        )
    }
    return (
        isOpened && <nav className="navigation navigation_theme--dark">
            <Link className="navigation__element navigation__element_theme--dark" to='/'>Home</Link>
            <Link className="navigation__element navigation__element_theme--dark navigation__element_active navigation__element_active_theme--dark" to='/saved-news'>Saved articles</Link>
            <button onClick={() => onLogout()} className="navigation__auth-button navigation__auth-button_theme--dark">{name} <img src={LogoutDark} alt="logout"/></button>
        </nav>
    )
}