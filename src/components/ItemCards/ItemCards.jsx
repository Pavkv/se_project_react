import ItemCard from "../ItemCard/ItemCard.jsx";
import React from "react";

export default function ItemCards({filteredItems, onCardClick}) {
    return (
        <ul className="item-cards">
            {filteredItems.map((clothingItem) => (
                <ItemCard key={clothingItem._id} clothingItem={clothingItem}
                          onClick={() => onCardClick("item", clothingItem)}/>
            ))}
        </ul>
    );
}