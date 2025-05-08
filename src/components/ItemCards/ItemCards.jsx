import ItemCard from '../ItemCard/ItemCard.jsx';
import React from 'react';

export default function ItemCards({
  filteredItems,
  onCardClick,
  isLoggedIn,
  onCardLike,
}) {
  return (
    <ul className="item-cards">
      {filteredItems.map((clothingItem) => (
        <ItemCard
          key={clothingItem._id}
          clothingItem={clothingItem}
          onClick={() => onCardClick('item', clothingItem)}
          isLoggedIn={isLoggedIn}
          onCardLike={onCardLike}
        />
      ))}
    </ul>
  );
}
