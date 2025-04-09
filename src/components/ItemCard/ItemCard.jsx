export default function ItemCard({ clothingItem, onClick}) {
    return (
        <li className="item-card">
            <button className="item-card__button" onClick={onClick}>
                <p className="item-card__name">{ clothingItem.name }</p>
                <img className="item-card__img"
                     src={ new URL(clothingItem.imageUrl, import.meta.url).href }
                     alt={ clothingItem.name }
                />
            </button>
        </li>
    );
}