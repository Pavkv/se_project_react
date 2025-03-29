export default function WeatherCard({ weatherCard }) {
    return (
        <section className="weather-card">
            <img className="weather-card__img" src={new URL(weatherCard.weatherCardBG, import.meta.url).href} alt="Weather Type" />
            <p className="weather-card__temp">{weatherCard.temp}°F</p>
        </section>
    );
}