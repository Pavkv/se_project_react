import React, {useContext} from "react";
import {MobileContext} from "../../context/MobileContext.js";
import ClothesSection from "./ClothesSection.jsx";
import SideBar from "./SideBar.jsx";

export default function Profile({filteredItems, onCardClick}) {
    const {isMobile, isMobileMenuOpen} = useContext(MobileContext);
    return (
        <div className="profile">
            {!isMobileMenuOpen && (
                <SideBar isMobile={isMobile}/>
            )}
            <ClothesSection filteredItems={filteredItems} onCardClick={onCardClick}/>
        </div>
    );
}