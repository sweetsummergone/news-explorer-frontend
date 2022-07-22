import { useState, useEffect } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function Main() {
    const [news, setNews] = useState([-1]);
    const [errorText, setErrorText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentModal, setCurrentModal] = useState("");

    const handleLoading = (value) => {
        setIsLoading(value);
    }

    const createNewsList = (articles, query) => {
        localStorage.setItem("lastSearch", JSON.stringify(articles));
        localStorage.setItem("lastCategory", query);
        setNews(articles);
    }

    useEffect(() => {
        if (localStorage.getItem("lastSearch")) {
            const news = localStorage.getItem("lastSearch");
            setNews(JSON.parse(news));
        }
    }, []);

    return (
        <>
            <Header onSignUp={setCurrentModal} isMain={true}/>
            <SearchForm onError={setErrorText} onSearch={createNewsList} onLoading={handleLoading} loadingStatus={isLoading}/>
            <NewsCardList onError={errorText} newsObj={news} category={localStorage.getItem("lastCategory")} loadingStatus={isLoading}/>
            {currentModal === "signup" && <PopupWithForm name="signup" onSwitch={setCurrentModal}/>}
            {currentModal === "signin" && <PopupWithForm name="signin" onSwitch={setCurrentModal}/>}
            {currentModal === "success" && <PopupWithForm name="success" onSwitch={setCurrentModal}/>}
            <About />
            <Footer />
        </>
    )
}