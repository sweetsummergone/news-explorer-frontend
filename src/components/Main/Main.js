import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";

export default function Main() {
    return (
        <>
            <Header />
            <main className="main">
                <SearchForm />
                <About />
            </main>
            <Footer />
        </>
    )
}