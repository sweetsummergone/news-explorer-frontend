export default function NewsCard({ image, category, date, title, subtitle, source }) {
    return (
        <div className="card">
            <img className="card__image" src={image} alt={title} />
            <div className="card__content">
                <p className="card__date">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h3 className="card__title">{title}</h3>
                <p className="card__subtitle">{subtitle}</p>
                <p className="card__source">{source}</p>
            </div>
        </div>
    )
}