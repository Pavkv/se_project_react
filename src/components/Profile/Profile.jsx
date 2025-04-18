import React, {useContext} from "react";
import {MobileContext} from "../../context/MobileContext.js";
import ClothesSection from "./ClothesSection.jsx";
import SideBar from "./SideBar.jsx";

export default function Profile({clothingItems, onCardClick, onAddClothesClick}) {
    const {isMobile, isMobileMenuOpen} = useContext(MobileContext);
    return (
        <div className="profile">
            {!isMobileMenuOpen && (
                <SideBar isMobile={isMobile}/>
            )}
            <ClothesSection clothingItems={clothingItems} onCardClick={onCardClick} onAddClothesClick={onAddClothesClick}/>
        </div>
    );
}