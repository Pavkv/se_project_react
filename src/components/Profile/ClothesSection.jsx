import ItemCards from "../ItemCards/ItemCards.jsx";
import React from "react";

export default function ClothesSection({filteredItems, onCardClick}) {
    return (
        <section className="clothes-section">
            <div className="clothes-section__header">
                <p className="clothes-section__header-text">Your Items</p>
                <button type="button" className="profile__button clothes-section__header-add-btn">+ Add new</button>
            </div>
            <ItemCards filteredItems={filteredItems} onCardClick={onCardClick}/>
        </section>
    );
};