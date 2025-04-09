import React, {useContext} from "react";
import User from "../User/User";
import ItemCards from "../ItemCards/ItemCards";
import {MobileContext} from "../../context/MobileContext.js";

const SideBar = ({isMobile}) => {
    return (
        <div className="profile__sidebar">
            <User/>
            {isMobile && (
                <>
                    <button className="profile__button profile__change-data-btn" type="button">Change profile data</button>
                    <button className="profile__button profile__log-out-btn" type="button">Log out</button>
                </>
            )}
        </div>
    );
};

const ClothesSection = ({filteredItems, onCardClick}) => {
    return (
        <section className="profile__clothes">
            <div className="profile__clothes-header">
                <p className="profile__clothes-header-text">Your Items</p>
                <button type="button" className="profile__button profile__clothes-header-add-btn">+ Add new</button>
            </div>
            <ItemCards filteredItems={filteredItems} onCardClick={onCardClick}/>
        </section>
    );
};

export default function Profile({filteredItems, onCardClick}) {
    const {isMobile} = useContext(MobileContext);
    return (
        <div className="profile">
            <SideBar isMobile={isMobile}/>
            <ClothesSection filteredItems={filteredItems} onCardClick={onCardClick}/>
        </div>
    );
}