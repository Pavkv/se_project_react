export default function ItemCard({ clothingItem, onClick}) {
    return (
        <li className="item-card" key={ clothingItem._id }>
            <button className="item-card__button" onClick={onClick}>
                <p className="item-card__name">{ clothingItem.name }</p>
                <img className="item-card__img"
                     src={ new URL(clothingItem.link, import.meta.url).href }
                     alt={ clothingItem.name }
                />
            </button>
        </li>
    );
}