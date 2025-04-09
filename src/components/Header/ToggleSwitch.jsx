import React, {useContext, useState} from "react";
import {CurrentTemperatureUnitContext} from "../../context/CurrentTemperatureUnitContext.js";

export default function ToggleSwitch() {
    const {tempUnit, handleToggleSwitchChange} = useContext(CurrentTemperatureUnitContext);
    const [isOn, setIsOn] = useState(false);

    const onChange = (e) => {
        setIsOn(e.target.checked);
        handleToggleSwitchChange();
    }

    return (
        <label className="toggle-switch">
            <input
                type="checkbox"
                checked={isOn}
                name="temp-toggle"
                value={tempUnit}
                className="toggle-switch__checkbox"
                onChange={onChange}
            />
            <span className="toggle-switch__slider">
                    <span className="toggle-switch__slider-text">F</span>
                    <span className="toggle-switch__slider-text">C</span>
                </span>
        </label>
    );
};