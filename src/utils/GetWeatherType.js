export default function getWeatherType(temp, tempUnit) {
    if (tempUnit === 'C') {
        temp = Math.round(temp * 9 / 5 + 32);
    }
    if (temp >= 75) return "hot";
    if (temp >= 55) return "warm";
    return "cold";
}
