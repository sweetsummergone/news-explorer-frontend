import { useState } from "react";
import Preloader from "../Preloader/Preloader";
import api from "../../utils/NewsApi";

export default function SearchForm({ onError, onSearch, onLoading, loadingStatus: isLoading }) {
    const [query, setQuery] = useState("");
    const [errorText, setErrorText] = useState("");
    const [lastQuery, setLastQuery] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (query.length < 2) {
            setErrorText("Please enter a keyword (minimum 2 characters)");
        }
        if (query.length > 2 && query !== lastQuery) {
            setErrorText("");
            onLoading(true);
            api.getNews({query})
                .then(res => {
                    onSearch(res.articles, query);
                    setLastQuery(query);
                })
                .catch(err => {
                    onError(err);
                    console.error(err);
                })
                .finally(() => {
                    onLoading(false);
                });
        }
    }

    return (
        <form className="search" onSubmit={(e) => {handleFormSubmit(e)}}>
            <h1 className="search__title">What's going on in the world?</h1>
            <p className="search__subtitle">Find the latest news on any topic and save them in your personal account.</p>
            <div className="searchbar">
                <input type="search" className="searchbar__input" placeholder="Enter topic" onChange={(e) => setQuery(e.target.value)}></input>
                <span className="searchbar__error">{errorText}</span>
                <button type="submit" disabled={isLoading} className={isLoading ? `searchbar__button button disabled` : `searchbar__button button`}>{isLoading ? <Preloader size="xs"/> : "Search"}</button>
            </div>
        </form>
    )
}