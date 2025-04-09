import React, {useContext} from 'react';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import {CurrentTemperatureUnitContext} from "../../context/CurrentTemperatureUnitContext.js";
import {MobileContext} from "../../context/MobileContext.js";
import ItemCards from "../ItemCards/ItemCards.jsx";

const WeatherToday = ({temp, tempUnit}) => {
    return (
        <p className="main__weather-today">
            {`Today is ${temp}° ${tempUnit} / You may want to wear:`}
        </p>
    );
};

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const Randomize = ({onClick}) => {
    return (
        <button className="main__randomize" onClick={onClick}>
            <span className="main__randomize-icon"/>
            Randomize
        </button>
    );
};

export default function Main({weatherCard, filteredItems, setFilteredItems, onCardClick}) {
    const {temp, tempUnit} = React.useContext(CurrentTemperatureUnitContext);
    const {isMobile, isMobileMenuOpen} = useContext(MobileContext);

    const handleRandomize = () => setFilteredItems(prev => shuffleArray(prev))

    return (
        <main className='main'>
            {!isMobileMenuOpen && (
                <WeatherCard weatherCard={weatherCard} temp={temp} tempUnit={tempUnit}/>
            )}
            <WeatherToday temp={temp} tempUnit={tempUnit}/>
            <ItemCards filteredItems={filteredItems} onCardClick={onCardClick}/>
            {isMobile && (
                <Randomize onClick={handleRandomize}/>
            )}
        </main>
    );
}