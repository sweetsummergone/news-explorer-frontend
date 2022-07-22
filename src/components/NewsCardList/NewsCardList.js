import { useContext, useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import notFound from "../../images/not_found.svg";

import mainApi from "../../utils/MainApi";

export default function NewsCardList({ onError, newsObj, category, loadingStatus: isLoading }) {
    const [page, setPage] = useState(1);
    const [savedNews, setSavedNews] = useState([]);

    useEffect(() => {
        mainApi.getArticles()
            .then((res) => {
                const savedNews = res.articles.filter(article => {
                    return article.users.includes(res.user);
                });
                setSavedNews(savedNews.map(article => article.link));
            });
    }, []);

    if (isLoading) {
        return (
            <section className="news news__loading">
                <Preloader />
                <p className="news__loading-title">Searching for news...</p>
            </section>
        )
    } else if (onError) {
        return (
            <section className="news news__not-found">
                <img className="news__image-not-found" src={notFound} alt="Sad guy. Not found!" />
                <h3 className="news__title-not-found">Sorry, something went wrong during the request</h3>
                <p className="news__subtitle-not-found" style={{maxWidth: 700}}>There may be a connection issue or the server may be down. Please try again later.</p>
            </section>
        )
    } else if (newsObj.length !== 0 && newsObj[0] !== -1) {
        return (
            <section className="news">
                <h2 className="news__title">Search results</h2>
                <ul className="news__list">
                    {newsObj.slice(0, page * 3).map((element, i) => {
                        return <li key={i}><NewsCard hasSaved={savedNews.includes(element.url)} image={element.urlToImage} category={category} date={element.publishedAt} title={element.title} subtitle={element.description} source={element.source.name} link={element.url} isSearch={true}/></li>
                    })}
                </ul>
                <button disabled={page * 3 >= newsObj.length} className={page * 3 < newsObj.length ? "news__more news__more--default button" : "news__more button disabled"} onClick={() => setPage(page + 1)}>Show more</button>
            </section>
        )
    } else if (newsObj.length === 0) {
        return (
            <section className="news news__not-found">
                <img className="news__image-not-found" src={notFound} alt="Sad guy. Not found!" />
                <h3 className="news__title-not-found">Nothing found</h3>
                <p className="news__subtitle-not-found">Sorry, but nothing matched your search terms.</p>
            </section>
        )
    }
}