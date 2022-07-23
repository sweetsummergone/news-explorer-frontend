import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";

export default function SavedNews() {
    const { currentUser } = useContext(CurrentUserContext);
    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    const handleDeleteCard = (id) => {
        mainApi.removeArticle(id)
            .then(() => {
                setNews(news.filter(article => { return article._id !== id }));
            })
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        setIsLoading(true);
        mainApi.getArticles()
            .then((res) => setNews(res.articles))
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        setCategories(news.map(article => article.keyword).filter((v, i, a) => a.indexOf(v) === i));
    }, [news]);

    return (
        <>
            <SavedNewsHeader />
            {isLoading && 
                <section className="news news__loading">
                    <Preloader />
                    <p className="news__loading-title">Searching for news...</p>
                </section>}
            {!isLoading && news.length > 0 &&
                <article className="saved">
                    <div className="saved__header">
                        <h2 className="saved__mark">Saved articles</h2>
                        <h1 className="saved__title">{currentUser.name}, you have {`${news.length}`} saved article{news.length > 1 && `s`}</h1>
                        <p className="saved__subtitle">By keywords: <span>{ categories.length === 1 ? categories[0] : categories.length === 2 ? categories.join(', ') : `${categories[0]}, ${categories[1]}, and ${categories.length - 2} other` }</span></p>
                    </div>
                    <section className="news saved__news">
                        <ul className="news__list">
                            {news.slice(0, page * 9).map(element => {
                                return <li key={element._id}><NewsCard onDelete={() => handleDeleteCard(element._id)} image={element.image} category={element.keyword} date={element.date} title={element.title} subtitle={element.text} source={element.source} /></li>
                            })}
                        </ul>
                        {page * 9 < news.length && <button className="news__more button" onClick={() => setPage(page + 1)}>Show more</button>}
                    </section>
                </article>
            }
            {
                !isLoading && news.length === 0 &&
                <article className="saved">
                    <div className="saved__header">
                        <h2 className="saved__mark">Saved articles</h2>
                        <h1 className="saved__title">{currentUser.name}, you don't have any saved articles</h1>
                        <Link to="/" className="saved__subtitle saved__link-back">Return to Home page</Link>
                    </div>
                </article>
            }
            <Footer />
        </>
    )
}