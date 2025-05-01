import User from "../User/User.jsx";
import React from "react";

export default function SideBar({onEditProfileClick, onSignOutClick}) {
    return (
        <div className="sidebar">
            <User/>
            <div className="sidebar__buttons">
                <button className="profile__button sidebar__edit-profile-btn" type="button" onClick={onEditProfileClick}>Edit profile</button>
                <button className="profile__button sidebar__log-out-btn" type="button" onClick={onSignOutClick}>Log out</button>
            </div>
        </div>
    );
}