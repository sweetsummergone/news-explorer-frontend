import Navigation from "../Navigation/Navigation";

export default function Header({ onSignUp }) {
    return (
        <header className="header">
            <p className="header__title">NewsExplorer</p>
            <Navigation onSignUp={onSignUp}/>
        </header>
    )
}