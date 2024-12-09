import React, { useState } from "react";
import axios from "axios"; // API handling
import { interpretWeatherCode, determineBackground, determineMood } from "./utils/interpretWeather";
import clothingItems from "./utils/clothingMenu";

function App() {
    const [weather, setWeather] = useState(null);
    const [avatar, setAvatar] = useState("default"); // Avatar image
    const [selectedClothing, setSelectedClothing] = useState([]); // Keeps track of selected clothing items
    const [error, setError] = useState(null);
    //const [outfit, setOutfit] = useState("default");

    // Get weather data and update visualisation
    const fetchWeather = () => {

        // Handle error
        if (!navigator.geolocation) {
            setError("Din webbläsare stöder inte geolokalisering.");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const { latitude, longitude } = position.coords;

                try {

                    const weatherResponse = await axios.get("/api/weather", {
                        params: { lat: latitude, lon: longitude },
                    });
                    const locationResponse = await axios.get("/api/geocode", {
                      params: { lat: latitude, lon: longitude },
                    });

                    const weatherData = weatherResponse.data;
                    const weatherInfo = interpretWeatherCode(weatherData.weatherCode);
                    const locationName = locationResponse.data.location;

                    setWeather({
                      ...weatherData,
                      location: locationName,
                      description: weatherInfo.description,
                    });

                    const backgroundImage = determineBackground(weatherData.weatherCode);
                    document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL}/backgrounds/${backgroundImage.background})`;

                    const avatarImage = determineMood(weatherData.weatherCode, weatherData.temperature);
                    setAvatar(avatarImage.mood);

                    // setOutfit(weatherInfo.outfit);
              } catch (err) {
                  setError("Kunde inte hämta väderdata.");
              }
          },
          () => setError("Kunde inte hämta din plats.")
      );
  };

  // Clothing
    const toggleClothingItem = (item) => {
        if (selectedClothing.includes(item)) {
            // Ta bort plagget om det redan är valt
            setSelectedClothing(selectedClothing.filter((i) => i !== item));
        } else {
            // Lägg till plagget
            setSelectedClothing([...selectedClothing, item]);
        }
    };

    /*const checkMood = () => {
        // Kontrollera om plaggen passar vädret
        const isSuitable = selectedClothing.every((item) =>
            item.weatherType.includes(weather.description)
        );
        return isSuitable ? "avatar-happy.png" : "avatar-sad.png";
    };*/

    //const avatar = checkMood();

    // setAvatar(checkMood());

  // Page content
    return (
        <div className="app">
            <div className="weather-info">
              <button onClick={fetchWeather}>Hämta väder</button>
              {error && <p>{error}</p>}
              {weather && (
                  <div>
                    <p>{weather.temperature}°C</p>
                    <p>{weather.location}</p>
                    <p>{weather.description}</p>
                  </div>
              )}
            </div>

            <div className="avatar-container">
                <img src={`${process.env.PUBLIC_URL}/avatars/${avatar}.png`} alt="avatar" class="avatar" />
                {selectedClothing.map((item) => (
                    <img
                        key={item.id}
                        src={`${process.env.PUBLIC_URL}/clothing/${item.image}`}
                        alt={item.name}
                        className="clothing-layer"
                    />
                ))}
            </div>

            <div className="clothing-menu">
                {clothingItems.map((item) => (
                        <button
                            key={item.id}
                            className={`clothing-button ${
                                selectedClothing.includes(item) ? "selected" : ""
                            }`}
                            onClick={() => toggleClothingItem(item)}
                        >
                            <img src={`${process.env.PUBLIC_URL}/clothing/${item.image}`} alt={item.name} />
                            <span>{item.name}</span>
                        </button>
                    ))}
            </div>
        </div>
    );
}

export default App;
