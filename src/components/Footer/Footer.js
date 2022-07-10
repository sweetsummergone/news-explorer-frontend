import github from "../../images/github.svg";
import facebook from "../../images/facebook.svg";

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; 2022 SSG | Powered by News API</p>
            <nav className="footer__nav">
                <p className="footer__element">Home</p>
                <p className="footer__element">Practicum by Yandex</p>
                <div className="footer__social">
                    <img className="footer__icon" alt="github" src={github} />
                    <img className="footer__icon" alt="facebook" src={facebook} />
                </div>
            </nav>
        </footer>
    )
}