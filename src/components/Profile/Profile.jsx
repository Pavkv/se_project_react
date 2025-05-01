import React, {useContext} from "react";
import {MobileContext} from "../../context/MobileContext.js";
import ClothesSection from "./ClothesSection.jsx";
import SideBar from "./SideBar.jsx";

export default function Profile({clothingItems, onCardClick, onAddClothesClick, onEditProfileClick, onSignOutClick}) {
    const {isMobileMenuOpen} = useContext(MobileContext);
    return (
        <div className="profile">
            {!isMobileMenuOpen && (
                <SideBar onEditProfileClick={() => onEditProfileClick("edit-profile")} onSignOutClick={onSignOutClick}/>
            )}
            <ClothesSection clothingItems={clothingItems} onCardClick={onCardClick} onAddClothesClick={onAddClothesClick}/>
        </div>
    );
}