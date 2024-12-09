// Translates weather codes (simplified in their categories) according to:
//https://open-meteo.com/en/docs#:~:text=WMO%20Weather%20interpretation%20codes%20(WW)
export function interpretWeatherCode(code) {
    if (code === 0) return { description: "Klar himmel" };
    if ([1, 2, 3].includes(code)) return { description: "Molnigt" };
    if ([45, 48].includes(code)) return { description: "Dimma" };
    if ([51, 53, 55].includes(code)) return { description: "Duggregn" };
    if ([61, 63, 65].includes(code)) return { description: "Regn" };
    if ([71, 73, 75, 77].includes(code)) return { description: "Snö" };
    if ([80, 81, 82].includes(code)) return { description: "Regnskurar" };
    if ([95, 96, 99].includes(code)) return { description: "Åskstorm" };
    return { description: "Okänt väder" };
};

// Returns background based on weather
export function determineBackground (code) {
    if (code === 0) return { background: "clear-bg.jpg" };
    if ([1, 2, 3].includes(code)) return { background: "cloudy-bg.jpg" };
    if ([45, 48].includes(code)) return { background: "foggy-bg.jpg" };
    if ([51, 53, 55,61, 63, 65, 80, 81, 82].includes(code)) return { background: "rainy-bg.jpg" };
    if ([71, 73, 75, 77].includes(code)) return { background: "snowy-bg.jpg" };
    if ([95, 96, 99].includes(code)) return { background: "stormy-bg.jpg" };
    return { background: "default-bg.jpg" };
};

// Returns Avatar moods based on weather
export function determineMood (code, temperature) {
    if ([0, 1, 2, 3, 45, 48].includes(code)) {
        if (temperature > 25) return { mood: "sweating" };
        if (temperature < 10) return { mood: "freezing" };
        return { mood: "sad" };}; 
    if ([51, 53, 55,61, 63, 65, 80, 81, 82].includes(code)) return { mood: "wet" };
    if ([71, 73, 75, 77].includes(code)) return { mood: "freezing" };
    if ([95, 96, 99].includes(code)) return { mood: "scared" };
    return { mood: "default" };
};
