import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import { newsObj } from "../../constants/cards";

import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SavedNews() {
    const { currentUser } = useContext(CurrentUserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            <SavedNewsHeader />
            {isLoading && 
                <section className="news news__loading">
                    <Preloader />
                    <p className="news__loading-title">Searching for news...</p>
                </section>}
            {!isLoading && newsObj.length > 0 &&
                <article className="saved">
                    <div className="saved__header">
                        <h2 className="saved__mark">Saved articles</h2>
                        <h1 className="saved__title">{currentUser.name}, you have {`${newsObj.length}`} saved articles</h1>
                        <p className="saved__subtitle">By keywords: <span>Nature, Yellowstone, and 2 other</span></p>
                    </div>
                    <section className="news saved__news">
                        <ul className="news__list">
                            {newsObj.slice(0, page * 9).map(element => {
                                return <li key={element.id}><NewsCard image={element.image} category={element.category} date={element.date} title={element.title} subtitle={element.subtitle} source={element.source} /></li>
                            })}
                        </ul>
                        {page * 9 < newsObj.length && <button className="news__more button" onClick={() => setPage(page + 1)}>Show more</button>}
                    </section>
                </article>
            }
            {
                !isLoading && newsObj.length === 0 &&
                <article className="saved">
                    <div className="saved__header">
                        <h2 className="saved__mark">Saved articles</h2>
                        <h1 className="saved__title">Elise, you don't have any saved articles</h1>
                        <Link to="/" className="saved__subtitle saved__link-back">Return to Home page</Link>
                    </div>
                </article>
            }
            <Footer />
        </>
    )
}