import { useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

import { newsObj } from "../../constants/cards";

export default function Main() {
    const [news, setNews] = useState([-1]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoading = (value) => {
        setIsLoading(value);
    }

    const findNews = (query) => {
        setNews(newsObj.filter(element => {
            return element.category === query;
        }));
    }

    return (
        <>
            <Header />
            <SearchForm onSearch={findNews} onLoading={handleLoading} loadingStatus={isLoading}/>
            <NewsCardList newsObj={news} loadingStatus={isLoading}/>
            <About />
            <Footer />
        </>
    )
}