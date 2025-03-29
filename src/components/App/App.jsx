import {useEffect, useState} from 'react';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddGarmentForm from "../ModalWithForm/AddGarmentForm.jsx";
import * as constants from '../../utils/constants.js';
import {getLocationNameWeather} from '../../utils/weatherApi.js';


export default function App() {
    const [location, setLocation] = useState('');
    const [temp, setTemp] = useState(0.0);
    const [weatherCardBG, setWeatherCardBG] = useState('');
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const {latitude, longitude} = position.coords;
            getLocationNameWeather(latitude, longitude, constants.OPENWEATHERKEY).then(data => {
                setLocation(data.location);
                setTemp(data.temp);
                setWeatherCardBG(data.weatherCardBG);
            });
        },
            () => {
                getLocationNameWeather(constants.location.latitude, constants.location.longitude, constants.OPENWEATHERKEY).then(data => {
                    setLocation(data.location);
                    setTemp(data.temp);
                    setWeatherCardBG(data.weatherCardBG);
                });
            });
    }, []);

    const [clothingItems, setClothingItems] = useState([]);
    useEffect(() => setClothingItems([...constants.defaultClothingItems]), []);

    const [isModalOpen, setModalOpen] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const openModal = (modalName, item) => {
        setModalOpen(modalName);
        setSelectedItem(item);
    };
    const closeModal = () => {
        setModalOpen("");
        setSelectedItem(null);
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 879);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setMobileMenuOpen(false);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className='app'>
            <Header location={location} onAddClothesClick={openModal} isMobile={isMobile}
                    isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu}/>
            <Main weatherCard={{temp, weatherCardBG}} clothingItems={clothingItems} onCardClick={openModal}
                  isMobileMenuOpen={isMobileMenuOpen} isMobile={isMobile}/>
            <Footer/>
            {isModalOpen === "item" && (<ItemModal item={selectedItem} onClose={closeModal} isOpen={isModalOpen}/>)}
            {isModalOpen === "add-garment" && (<AddGarmentForm onClose={closeModal} isOpen={isModalOpen}/>)}
        </div>
    );
}