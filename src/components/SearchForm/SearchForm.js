export default function SearchForm() {
    return (
        <form className="search__form">
            <h1 className="search__title">What's going on in the world?</h1>
            <p className="search__subtitle">Find the latest news on any topic and save them in your personal account.</p>
            <div className="searchbar">
                <input type="search" className="searchbar__input" placeholder="Enter topic"></input>
                <button type="submit" className="searchbar__button button">Search</button>
            </div>
        </form>
    )
}