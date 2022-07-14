import { Link } from "react-router-dom";
import Logout from "../../images/logout.svg";

export default function Navigation({auth, onSignUp, isOpened}) {
    if (!auth) return (
        isOpened && <nav className="navigation">
            <Link className="navigation__element navigation__element_active" to='/'>Home</Link>
            <Link className="navigation__element" to='/saved-news'>Saved articles</Link>
            <button onClick={() => onSignUp("signin")} className="navigation__auth-button">Sign in</button>
        </nav>
    )
    return (
        isOpened && <nav className="navigation navigation--dark">
            <Link className="navigation__element navigation__element--dark" to='/'>Home</Link>
            <Link className="navigation__element navigation__element--dark navigation__element_active navigation__element_active--dark" to='/saved-news'>Saved articles</Link>
            <button className="navigation__auth-button navigation__auth-button--dark">Elise <img src={Logout} alt="logout"/></button>
        </nav>
    )
}