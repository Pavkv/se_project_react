export default function WeatherCard({ weatherCard }) {
    return (
        <section className="weather-card">
            <img className="weather-card__img" src={`${import.meta.env.BASE_URL}${weatherCard.weatherCardBG}`} alt="Weather Type" />
            <p className="weather-card__temp">{weatherCard.temp}°F</p>
        </section>
    );
}