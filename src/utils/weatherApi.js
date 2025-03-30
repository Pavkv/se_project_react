const fetchResponse = async (url) => {
    return await fetch(`${url}`).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    });
};

const getWeatherCardBG = (type, sunrise, sunset) => {
    const time = Date.now();
    const weatherType = ({
        "Clear": "Sunny",
        "Clouds": "Cloudy",
        "Rain": "Rain",
        "Thunderstorm": "Storm",
        "Snow": "Snow",
        "Fog": "Fog"
    })[type];
    const dayTime = time > sunrise * 1000 && time < sunset * 1000 ? "Day" : "Night";
    return `assets/Weather-Card/${dayTime}/${weatherType}.png`;
};

export const getLocationNameWeather = (lat, lon, key) => {
    return fetchResponse(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`).
    then(res => {
        return {
            location: res.name,
            temp: Math.round(res.main.temp),
            weatherCardBG: getWeatherCardBG(res.weather[0].main, res.sys.sunrise, res.sys.sunset)
    }});
};