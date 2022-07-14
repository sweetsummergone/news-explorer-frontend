import { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import notFound from "../../images/not_found.svg";

export default function NewsCardList({ newsObj, loadingStatus: isLoading }) {
    const [page, setPage] = useState(1);
    if (isLoading) {
        return (
            <section className="news news__loading">
                <Preloader />
                <p className="news__loading-title">Searching for news...</p>
            </section>
        )
    } else if (newsObj.length !== 0 && newsObj[0] !== -1) {
        return (
            <section className="news">
                <h2 className="news__title">Search results</h2>
                <ul className="news__list">
                    {newsObj.slice(0, page * 3).map(element => {
                        return <li key={element.id}><NewsCard image={element.image} category={element.category} date={element.date} title={element.title} subtitle={element.subtitle} source={element.source} isSearch={true}/></li>
                    })}
                </ul>
                <button disabled={page * 3 >= newsObj.length} className={page * 3 < newsObj.length ? "news__more button" : "news__more button disabled"} onClick={() => setPage(page + 1)}>Show more</button>
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