import { Link } from "react-router-dom";
import github from "../../images/github.svg";
import facebook from "../../images/facebook.svg";

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; 2022 SSG | Powered by News API</p>
            <nav className="footer__nav">
                <Link className="footer__element" to="/">Home</Link>
                <p className="footer__element" onClick={() => window.open("https://practicum100.com")}>Practicum by Yandex</p>
                <div className="footer__social">
                    <img className="footer__icon" alt="github" src={github} onClick={() => window.open("https://github.com/sweetsummergone")} />
                    <img className="footer__icon" alt="facebook" src={facebook} onClick={() => window.open("https://facebook.com")}/>
                </div>
            </nav>
        </footer>
    )
}