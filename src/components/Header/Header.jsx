import React, { useContext } from 'react';
import User from '../User/User';
import { MobileContext } from '../../context/MobileContext.js';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../../context/ProfileContext.js';
import ToggleSwitch from './ToggleSwitch.jsx';

const Logo = () => <Link to="/" className="header__logo" />;

const CurrentDate = () => {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });
  return (
    <time className="header__text header__text_date-loc">{currentDate},</time>
  );
};

const Location = ({ location }) => (
  <p className="header__text header__text_date-loc">&nbsp;{location}</p>
);

const AddClothes = ({ onClick }) => (
  <button className="header__button header__text" onClick={onClick}>
    + Add clothes
  </button>
);

const SignUp = ({ onClick }) => (
  <button className="header__button header__text" onClick={onClick}>
    Sign Up
  </button>
);

const LogIn = ({ onClick }) => (
  <button className="header__button header__text" onClick={onClick}>
    Log In
  </button>
);

export default function Header({ location, onButtonClick, isLoggedIn }) {
  const { isMobile, isMobileMenuOpen, toggleMobileMenu } =
    useContext(MobileContext);
  const { isProfileOpen } = useContext(ProfileContext);

  return (
    <header className="header">
      {isMobile ? (
        isMobileMenuOpen ? (
          <div className="header__mobile-menu">
            <button
              type="button"
              className="header__close-btn"
              onClick={toggleMobileMenu}
            />
            <Link to="/profile" className="header__user">
              <User />
            </Link>
            <AddClothes onClick={() => onButtonClick('add-garment')} />
            <ToggleSwitch />
          </div>
        ) : (
          <>
            {isProfileOpen ? (
              <>
                <div className="header__first-line-profile">
                  <Logo />
                  <CurrentDate />
                  <Location location={location} />
                  <button
                    className="header__menu-toggle"
                    onClick={toggleMobileMenu}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="header__first-line">
                  <Logo />
                  <button
                    className="header__menu-toggle"
                    onClick={toggleMobileMenu}
                  />
                </div>
                <div className="header__second-line">
                  <CurrentDate />
                  <Location location={location} />
                </div>
              </>
            )}
          </>
        )
      ) : (
        <>
          <Logo />
          <CurrentDate />
          <Location location={location} />
          <div className="header__menu-bar">
            <ToggleSwitch />
            {isLoggedIn ? (
              <>
                <AddClothes onClick={() => onButtonClick('add-garment')} />
                <Link to="/profile" className="header__user">
                  <User />
                </Link>
              </>
            ) : (
              <>
                <SignUp onClick={() => onButtonClick('sign-up')} />
                <LogIn onClick={() => onButtonClick('log-in')} />
              </>
            )}
          </div>
        </>
      )}
    </header>
  );
}
