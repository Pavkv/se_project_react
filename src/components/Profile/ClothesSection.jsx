import ItemCards from '../ItemCards/ItemCards.jsx';
import React from 'react';

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClothesClick,
}) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__header-text">Your Items</p>
        <button
          type="button"
          className="profile__button clothes-section__header-add-btn"
          onClick={() => onAddClothesClick('add-garment')}
        >
          + Add new
        </button>
      </div>
      <ItemCards filteredItems={clothingItems} onCardClick={onCardClick} />
    </section>
  );
}
