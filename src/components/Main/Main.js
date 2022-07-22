import { useState, useEffect } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function Main() {
    const [news, setNews] = useState([-1]);
    const [category, setCategory] = useState("");
    const [errorText, setErrorText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentModal, setCurrentModal] = useState("");

    const handleLoading = (value) => {
        setIsLoading(value);
    }

    const createNewsList = (articles, query) => {
        localStorage.setItem("lastSearch", JSON.stringify(articles));
        setNews(articles);
        setCategory(query);
    }

    useEffect(() => {
        if (localStorage.getItem("lastSearch")) {
            setNews(JSON.parse(localStorage.getItem("lastSearch")));
        }
    }, []);

    return (
        <>
            <Header onSignUp={setCurrentModal} isMain={true}/>
            <SearchForm onError={setErrorText} onSearch={createNewsList} onLoading={handleLoading} loadingStatus={isLoading}/>
            <NewsCardList onError={errorText} newsObj={news} category={category} loadingStatus={isLoading}/>
            {currentModal === "signup" && <PopupWithForm name="signup" onSwitch={setCurrentModal}/>}
            {currentModal === "signin" && <PopupWithForm name="signin" onSwitch={setCurrentModal}/>}
            {currentModal === "success" && <PopupWithForm name="success" onSwitch={setCurrentModal}/>}
            <About />
            <Footer />
        </>
    )
}