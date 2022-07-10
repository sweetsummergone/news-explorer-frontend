import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

export default function Main() {
    return (
        <>
            <Header />
            <SearchForm />
            <NewsCardList />
            <About />
            <Footer />
        </>
    )
}