import { Link } from "react-router-dom";

export default function Navigation({theme}) {
    if (!theme) return (
        <nav className="navigation">
            <Link className="navigation__element navigation__element_active" to='/'>Home</Link>
            <Link className="navigation__element" to='/saved-news'>Saved articles</Link>
            <button className="navigation__auth_button">Sign in</button>
        </nav>
    )
    return (
        <nav className="navigation">
            <Link className="navigation__element navigation__element_dark" to='/'>Home</Link>
            <Link className="navigation__element navigation__element_dark navigation__element_active navigation__element_active_dark" to='/saved-news'>Saved articles</Link>
            <button className="navigation__auth_button navigation__auth_button_dark">Sign in</button>
        </nav>
    )
}