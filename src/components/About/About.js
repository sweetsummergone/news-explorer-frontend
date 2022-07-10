import authorImage from "../../images/katana.png";

export default function About() {
    return(
        <section className="about">
            <img className="about__image" src={authorImage} alt="Shogun In Headphones"></img>
            <div className="about__bio">
                <h2 className="about__title">About the author</h2>
                <p className="about__desc">Aleksandr Limberg is a passionate Full-Stack developer from Ukraine, now lives in Israel. Bachelor of Computer Since in Software Engineering with more than 5 years of experience developing applications for different destinations. Main stack of technologies includes React, Express, NodeJS, MongoDB.</p>
                <p className="about__desc">Finished Yandex Practicum courses and increased self-education level, solving different types of tasks and issues using the full specter of methods, algorithms, and patterns.</p>
            </div>
        </section>
    )
}