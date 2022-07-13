import { useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

import { newsObj } from "../../constants/cards";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function Main() {
    const [news, setNews] = useState([-1]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentModal, setCurrentModal] = useState("");

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
            <Header onSignUp={setCurrentModal}/>
            <SearchForm onSearch={findNews} onLoading={handleLoading} loadingStatus={isLoading}/>
            <NewsCardList newsObj={news} loadingStatus={isLoading}/>
            {currentModal === "signup" && <PopupWithForm name="signup" onSwitch={setCurrentModal}/>}
            {currentModal === "signin" && <PopupWithForm name="signin" onSwitch={setCurrentModal}/>}
            <About />
            <Footer />
        </>
    )
}