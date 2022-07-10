export default function Header() {
    return (
        <header className="header">
            <p className="header__title">NewsExplorer</p>
            <nav className="header__nav">
                <p className="header__element header__element_active">Home</p>
                <button className="header__auth_button">Sign in</button>
            </nav>
        </header>
    )
}