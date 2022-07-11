import Navigation from "../Navigation/Navigation";

export default function SavedNewsHeader() {
    return (
        <header className="header header__dark">
            <p className="header__title header__title_dark">NewsExplorer</p>
            <Navigation theme='dark'/>
        </header>
    )
}