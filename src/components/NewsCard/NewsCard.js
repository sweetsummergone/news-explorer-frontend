import { useState, useContext, useEffect } from "react";
import Bookmark from "../../images/bookmark.svg";
import BookmarkFilled from "../../images/bookmarkFilled.svg";
import Trash from "../../images/trash.svg";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";

export default function NewsCard({ image, category, date, title, subtitle, source, link, isSearch, hasSaved }) {
    const [isHovering, setIsHovering] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const { isAuth } = useContext(CurrentUserContext);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const handleSave = () => {
        mainApi.saveArticle({ keyword: category, date, title, text: subtitle, source, link, image })
            .then(() => {
                setIsSaved(true);
            });
    }

    const handleRemoveByLink = (link) => {
        mainApi.removeByLink(link)
            .then(() => setIsSaved(false));
    }

    useEffect(() => {
        setIsSaved(hasSaved);
    }, [hasSaved]);

    return (
        <div className="card">
            <div className="card__controls">
                {isSearch ? 
                <div className="card__action">
                    <div className="card__action_image-wrapper" onClick={isAuth && !isSaved ? handleSave : isAuth && isSaved ? () => handleRemoveByLink(link) : undefined}>
                        {!isSaved && <img onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="card__action_image" src={Bookmark} alt="save as bookmark" />}
                        {isSaved && <img className="card__action_image" src={BookmarkFilled} alt="remove as bookmark" />}
                    </div>
                    {!isAuth && isHovering && <p className="card__action_tooltip">Sign in to save articles</p>}
                </div>
                :
                <div className="card__action">
                    <div className="card__action_image-wrapper" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
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