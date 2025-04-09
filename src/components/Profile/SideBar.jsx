import User from "../User/User.jsx";
import React from "react";

export default function SideBar({isMobile}){
    return (
        <div className="sidebar">
            <User/>
            {isMobile && (
                <>
                    <button className="profile__button sidebar__change-data-btn" type="button">Change profile data</button>
                    <button className="profile__button sidebar__log-out-btn" type="button">Log out</button>
                </>
            )}
        </div>
    );
}