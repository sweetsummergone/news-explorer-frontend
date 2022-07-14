import { useState } from "react";
import Bookmark from "../../images/bookmark.svg";
import Trash from "../../images/trash.svg";

export default function NewsCard({ image, category, date, title, subtitle, source, isSearch }) {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <div className="card">
            <div className="card__controls">
                {isSearch ? 
                <div className="card__action">
                    <div className="card__action-image-wrapper" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        <img onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="card__action_image" src={Bookmark} alt="save as bookmark" />
                    </div>
                    {isHovering && <p className="card__action_tooltip">Sign in to save articles</p>}
                </div>
                :
                <div className="card__action">
                    <div className="card__action-image-wrapper" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        <img className="card__action_image" src={Trash} alt="delete as trash can" />
                    </div>
                    {isHovering && <p className="card__action_tooltip">Remove from saved</p>}
                </div>}
                {!isSearch && <p className="card__category">{category}</p>}
            </div>
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