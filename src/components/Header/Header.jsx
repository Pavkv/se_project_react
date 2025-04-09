import React, {useContext, useState} from 'react';
import User from "../User/User";
import {CurrentTemperatureUnitContext} from "../../context/CurrentTemperatureUnitContext.js";
import {MobileContext} from "../../context/MobileContext.js";
import {Link} from "react-router-dom";
import {ProfileContext} from "../../context/ProfileContext.js";

const Logo = () => <Link to="/" className="header__logo"/>;

const CurrentDate = () => {
    const currentDate = new Date().toLocaleString('default', {month: 'long', day: 'numeric'});
    return <time className="header__text header__text_date-loc">{currentDate},</time>;
};

const Location = ({location}) => <p className="header__text header__text_date-loc">&nbsp;{location}</p>;

const ToggleSwitch = () => {
    const {tempUnit, handleToggleSwitchChange} = useContext(CurrentTemperatureUnitContext);
    const [isOn, setIsOn] = useState(false);

    const onChange = (e) => {
        setIsOn(e.target.checked);
        handleToggleSwitchChange();
    }

    return (
        <label className="header__toggle-switch">
            <input
                type="checkbox"
                checked={isOn}
                name="temp-toggle"
                value={tempUnit}
                className="header__toggle-checkbox"
                onChange={onChange}
            />
            <span className="header__toggle-slider">
                    <span className="slider-text">F</span>
                    <span className="slider-text">C</span>
                </span>
        </label>
    );
};

const AddClothes = ({onClick}) => (
    <button className="header__add-clothes header__text" onClick={onClick}>
        + Add clothes
    </button>
);

export default function Header({location, onAddClothesClick}) {
    const {isMobile, isMobileMenuOpen, toggleMobileMenu} = useContext(MobileContext);
    const {isProfileOpen} = useContext(ProfileContext);

    return (
        <header className='header'>
            {isMobile ? (
                isMobileMenuOpen ? (
                    <div className="header__mobile-menu">
                        <button type="button" className="header__close-btn" onClick={toggleMobileMenu}/>
                        <Link to="/profile" className="header__user">
                            <User />
                        </Link>
                        <AddClothes onClick={() => onAddClothesClick("add-garment")}/>
                        <ToggleSwitch/>
                    </div>
                ) : (
                    <>
                        {isProfileOpen ? (
                            <>
                                <div className='header__first-line-profile'>
                                    <Logo/>
                                    <CurrentDate/>
                                    <Location location={location}/>
                                    <button className="header__menu-toggle" onClick={toggleMobileMenu}/>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='header__first-line'>
                                    <Logo/>
                                    <button className="header__menu-toggle" onClick={toggleMobileMenu}/>
                                </div>
                                <div className='header__second-line'>
                                    <CurrentDate/>
                                    <Location location={location}/>
                                </div>
                            </>
                        )}
                    </>
                )
            ) : (
                <>
                    <Logo/>
                    <CurrentDate/>
                    <Location location={location}/>
                    <ToggleSwitch/>
                    <AddClothes onClick={() => onAddClothesClick("add-garment")}/>
                    <Link to="/profile" className="header__user">
                        <User />
                    </Link>
                </>
            )}
        </header>
    );
}