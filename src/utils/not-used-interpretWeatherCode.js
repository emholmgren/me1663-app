// Translates weather codes (simplified in their categories) according to:
//https://open-meteo.com/en/docs#:~:text=WMO%20Weather%20interpretation%20codes%20(WW)
const interpretWeatherCode = (code) => {
    if (code === 0) return { description: "Klar himmel", background: "sunny-bg.jpg", avatar: "happy" };
    if ([1, 2, 3].includes(code)) return { description: "Molnigt", background: "cloudy-bg.jpg", avatar: "neutral" };
    if ([45, 48].includes(code)) return { description: "Dimma", background: "foggy-bg.jpg", avatar: "neutral" };
    if ([51, 53, 55].includes(code)) return { description: "Duggregn", background: "rainy-bg.jpg", avatar: "neutral" };
    if ([61, 63, 65].includes(code)) return { description: "Regn", background: "rainy-bg.jpg", avatar: "umbrella" };
    if ([71, 73, 75, 77].includes(code)) return { description: "Snö", background: "snowy-bg.jpg", avatar: "freezing" };
    if ([80, 81, 82].includes(code)) return { description: "Regnskurar", background: "rainy-bg.jpg", avatar: "umbrella" };
    if ([95, 96, 99].includes(code)) return { description: "Åskstorm", background: "stormy-bg.jpg", avatar: "scared" };
    return { description: "Unknown weather", background: "default-bg.jpg", avatar: "neutral" };
};