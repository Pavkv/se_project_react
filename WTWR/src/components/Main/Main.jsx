import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import {useState, useEffect} from 'react';

function getWeatherType(temp) {
    if (temp >= 75) return "hot";
    if (temp >= 55) return "warm";
    return "cold";
}

const WeatherToday = ({temp}) => {
    return (
        <p className="main__weather-today">
            Today is {temp}° F / You may want to wear:
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

const ItemCards = ({clothingItems, onCardClick, temp}) => {
    return (
        <section className="main__card-list">
            <ul className="main__item-cards">
                {clothingItems.filter(clothingItem => clothingItem.weather === getWeatherType(temp)).map((clothingItem) => (
                    <ItemCard key={clothingItem._id} clothingItem={clothingItem}
                              onClick={() => onCardClick("item", clothingItem)}/>
                ))}
            </ul>
        </section>
    );
};

const Randomize = ({onClick}) => {
    return (
        <>
            <button className="main__randomize" onClick={onClick}>
                <span className="main__randomize-icon" />
                Randomize
            </button>
        </>
    );
};


export default function Main({ weatherCard, clothingItems, onCardClick, isMobileMenuOpen, isMobile }) {
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const initialFiltered = clothingItems.filter(item => item.weather === getWeatherType(weatherCard.temp));
        setFilteredItems(initialFiltered);
    }, [clothingItems, weatherCard.temp]);

    const handleRandomize = () => {
        setFilteredItems(prev => shuffleArray(prev));
    };

    return (
        <main className='main'>
            {!isMobileMenuOpen && (
                <WeatherCard weatherCard={weatherCard} />
            )}
            <WeatherToday temp={weatherCard.temp} />
            <ItemCards clothingItems={filteredItems} onCardClick={onCardClick} temp={weatherCard.temp} />
            {isMobile && (
                <Randomize onClick={handleRandomize} />
            )}
        </main>
    );
}