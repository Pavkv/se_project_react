import {useState} from 'react';

const Logo = () => {
    return (
        <>
            <span className="header__logo"/>
        </>
    )
};

const CurrentDate = () => {
    const currentDate = new Date().toLocaleString('default', {month: 'long', day: 'numeric'});

    return (
        <>
            <time className="header__text header__text_date-loc">{currentDate},</time>
        </>
    );
};

const Location = ({location}) => {
    return (
        <>
            <p className="header__text header__text_date-loc">&nbsp;{location}</p>
        </>
    );
};

const AddClothes = ({onClick}) => {
    return (
        <>
            <button className="header__add-clothes header__text" onClick={onClick}>
                + Add clothes
            </button>
        </>
    );
};

const User = () => {
    const name = "Pasha Zobov";
    const avatar = new URL(`../../assets/Default-Avatar.png`, import.meta.url).href;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <p className="header__text header__text_name">{name}</p>
            <div onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
                 className="header__avatar"
            >{!isHovered ? (
                <img className="header__avatar-image" src={avatar} alt="Avatar"/>
            ) : (
                <span className="header__avatar-text header__text"
                >{name.charAt(0).toUpperCase()}
                </span>
            )}
            </div>
        </>
    );
};

export default function Header({location, onAddClothesClick, isMobile, isMobileMenuOpen, toggleMobileMenu}) {

    return (
        <header className='header'>
            {isMobile ? (
                <>
                    {isMobileMenuOpen ? (
                        <div className="header__mobile-menu">
                            <button
                                type="button"
                                className="header__close-btn"
                                onClick={toggleMobileMenu}
                            ></button>
                            <div className="header__mobile-user">
                                <User/>
                            </div>
                            <AddClothes onClick={() => onAddClothesClick("add-garment")}/>
                        </div>
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
            ) : (
                <>
                    <Logo/>
                    <CurrentDate/>
                    <Location location={location}/>
                    <AddClothes onClick={() => onAddClothesClick("add-garment")}/>
                    <User/>
                </>
            )}
        </header>
    );
}