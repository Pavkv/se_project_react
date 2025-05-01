import React from "react";
import {CurrentUserContext} from "../../context/CurrentUserContext.js";

export default function ItemCard({ clothingItem, onClick, isLoggedIn, onCardLike}) {
    const {currentUser} = React.useContext(CurrentUserContext);
    const [isLiked, setIsLiked] = React.useState(false);

    React.useEffect(() => {
        if (currentUser?._id && Array.isArray(clothingItem.likes)) {
            setIsLiked(clothingItem.likes.includes(currentUser._id));
        }
    }, [clothingItem.likes, currentUser?._id]);

    const handleLike = () => onCardLike(clothingItem._id, isLiked);

    return (
        <li className="item-card">
            <div className="item-card__button" onClick={onClick}>
                <div className="item-card__header">
                    <p className="item-card__name">{clothingItem.name}</p>
                    {isLoggedIn && (
                        <button
                            type="button"
                            className={`item-card__like item-card__like${isLiked ? "_selected" : "_idle"}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleLike();
                            }}
                        />
                    )}
                </div>
                <img
                    className="item-card__img"
                    src={new URL(clothingItem.imageUrl, import.meta.url).href}
                    alt={clothingItem.name}
                />
            </div>
        </li>
    );
}