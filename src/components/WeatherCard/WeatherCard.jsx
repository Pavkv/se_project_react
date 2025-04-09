export default function WeatherCard({ weatherCard, temp, tempUnit }) {
    return (
        <section className="weather-card">
            <img className="weather-card__img" src={`${import.meta.env.BASE_URL}${weatherCard}`} alt="Weather Type" />
            <p className="weather-card__temp">{temp}°{tempUnit}</p>
        </section>
    );
}