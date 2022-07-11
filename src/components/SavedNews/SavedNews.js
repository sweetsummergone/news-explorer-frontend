import { useEffect, useState } from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import { newsObj } from "../../constants/cards";

export default function SavedNews() {
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
            {!isLoading &&
                <>
                    <div className="saved__header">
                        <p className="saved__mark">Saved articles</p>
                        <h2 className="news__title saved__title">Elise, you have {`${newsObj.length}`} saved articles</h2>
                        <p className="saved__filter">By keywords: <span>Nature, Yellowstone, and 2 other</span></p>
                    </div>
                    <section className="news saved__news">
                        <ul className="news__list">
                            {newsObj.slice(0, page * 9).map(element => {
                                return <li key={element.id}><NewsCard image={element.image} category={element.category} date={element.date} title={element.title} subtitle={element.subtitle} source={element.source} /></li>
                            })}
                        </ul>
                        {page * 9 < newsObj.length && <button className="news__more button" onClick={() => setPage(page + 1)}>Show more</button>}
                    </section>
                </>
            }
            <Footer />
        </>
    )
}