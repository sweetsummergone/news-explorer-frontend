import authorImage from "../../images/katana.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Main() {
    return (
        <>
            <Header />
            <main className="main">
                <section className="main__search">
                    <h1 className="main__title">What's going on in the world?</h1>
                    <p className="main__subtitle">Find the latest news on any topic and save them in your personal account.</p>
                    <div className="main__searchbar">
                        <input type="search" className="searchbar__input" placeholder="Enter topic"></input>
                        <button className="searchbar__button">Search</button>
                    </div>
                </section>
                <section className="main__about">
                    <img className="about__image" src={authorImage} alt="Shogun In Headphones"></img>
                    <div className="about__bio">
                        <h2 className="about__title">About the author</h2>
                        <p className="about__desc">Aleksandr Limberg is a passionate Full-Stack developer from Ukraine, now lives in Israel. Bachelor of Computer Since in Software Engineering with more than 5 years of experience developing applications for different destinations. Main stack of technologies includes React, Express, NodeJS, MongoDB.</p>
                        <p className="about__desc">Finished Yandex Practicum courses and increased self-education level, solving different types of tasks and issues using the full specter of methods, algorithms, and patterns.</p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}