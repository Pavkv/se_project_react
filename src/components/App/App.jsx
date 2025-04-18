import {Routes, Route, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../ModalWithForm/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import getWeatherType from "../../utils/GetWeatherType.js";
import ItemDeleteConfirmationModel from "../ItemModal/ItemDeleteConfirmationModel.jsx";
import * as constants from '../../utils/constants.js';
import {getLocationNameWeather} from '../../utils/weatherApi.js';
import {getItems, addItem, deleteItem} from "../../utils/api.js";
import {CurrentTemperatureUnitContext} from "../../context/CurrentTemperatureUnitContext.js";
import {MobileContext} from "../../context/MobileContext.js";
import {ProfileContext} from "../../context/ProfileContext.js";

export default function App() {
    const loc = useLocation();
    const [location, setLocation] = useState('');
    const [originalTempF, setOriginalTempF] = useState(0);
    const [temp, setTemp] = useState(0);
    const [weatherCard, setWeatherCard] = useState('');
    const [tempUnit, setTempUnit] = useState('F');
    const [clothingItems, setClothingItems] = useState([]);
    const [isModalOpen, setModalOpen] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 879);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleToggleSwitchChange = () => {
        setTempUnit((prevUnit) => {
            const newUnit = prevUnit === 'F' ? 'C' : 'F';
            const newTemp = newUnit === 'C'
                ? Math.round((originalTempF - 32) * 5 / 9)
                : originalTempF;

            setTemp(newTemp);
            return newUnit;
        });
    };

    useEffect(() => {
        const fetchWeather = (latitude, longitude) => {
            getLocationNameWeather(latitude, longitude, constants.OPENWEATHERKEY)
                .then(data => {
                    setLocation(data.location);
                    setOriginalTempF(data.temp);
                    setTemp(data.temp);
                    setWeatherCard(data.weatherCardBG);
                })
                .catch(console.log);
        };

        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => fetchWeather(latitude, longitude),
            () => fetchWeather(constants.location.latitude, constants.location.longitude)
        );
    }, []);

    useEffect(() => {
        getItems().then(data => {
            return setClothingItems([...data.reverse()])
        }).catch(console.error);
    }, []);

    useEffect(() => {
        const filtered = clothingItems.filter(item => item.weather === getWeatherType(temp, tempUnit));
        setFilteredItems(filtered);
    }, [clothingItems, temp]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setMobileMenuOpen(false);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const openModal = (modalName, item) => {
        setModalOpen(modalName);
        setSelectedItem(item);
    };

    const closeModal = () => {
        setModalOpen("");
        setSelectedItem(null);
    };

    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

    useEffect(() => {
        if (loc.pathname === '/') {
            setProfileOpen(false);
        } else {
            setProfileOpen(true);
        }
    }, [loc.pathname]);

    return (
        <div className='app'>
            <CurrentTemperatureUnitContext.Provider value={{temp, tempUnit, handleToggleSwitchChange}}>
                <MobileContext.Provider value={{isMobile, isMobileMenuOpen, toggleMobileMenu}}>
                    <ProfileContext.Provider value={{isProfileOpen}}>
                        <Header location={location} onAddClothesClick={openModal}/>
                        <Routes>
                            <Route path="/" element={<Main weatherCard={weatherCard} onCardClick={openModal}
                                                           filteredItems={filteredItems}
                                                           setFilteredItems={setFilteredItems}/>}/>
                            <Route path="/profile"
                                   element={<Profile weatherCard={weatherCard} onCardClick={openModal}
                                                     clothingItems={clothingItems} onAddClothesClick={openModal}/>}/>
                        </Routes>
                        <Footer/>
                        {isModalOpen === "item" &&
                            <ItemModal item={selectedItem} onClose={closeModal} isOpen={isModalOpen}
                                       onDeleteClick={() => setModalOpen("item-delete-confirmation")}/>}
                        {isModalOpen === "add-garment" &&
                            <AddItemModal onClose={closeModal} isOpen={isModalOpen} addItem={addItem}
                                          clothingItems={clothingItems} setClothingItems={setClothingItems} isLoading={isLoading} setLoading={setLoading}/>}
                        {isModalOpen === "item-delete-confirmation" &&
                            <ItemDeleteConfirmationModel onClose={closeModal} isOpen={isModalOpen} isLoading={isLoading} onClick={() => {
                                setLoading(true);
                                deleteItem(selectedItem._id).then(() => setClothingItems(clothingItems.filter(item => item._id !== selectedItem._id)))
                                    .then(() => getItems())
                                    .catch(console.error).then(closeModal).finally(() => setLoading(false));
                            }}/>}
                    </ProfileContext.Provider>
                </MobileContext.Provider>
            </CurrentTemperatureUnitContext.Provider>
        </div>
    );
}