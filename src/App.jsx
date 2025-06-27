import { useEffect, useState } from "react";
import { getWeather } from "./weatherApi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(""); // <-- new error state

  const handleClick = async () => {
    setError("");
    setWeather(null);
    try {
      const data = await getWeather(city);
      console.log(data);
      if (data.cod && data.cod !== 200) {
        setError("City not found. Please try again.");
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Weather Forecast
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleClick();
              }
            }}
          />
          <button
            onClick={handleClick}
            className="cursor-pointer p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out">
            Search
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-center font-semibold mb-4">
            {error}
          </div>
        )}

        {weather && (
          <div className="text-center mt-6">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
              {weather.name}
            </h2>
            <p className="text-xl text-gray-600 capitalize mb-2">
              {weather.weather[0].description}
            </p>
            <p className="text-6xl font-bold text-blue-700 mb-4">
              {Math.round(weather.main.temp)}°C
            </p>
            <div className="flex justify-center gap-6 text-gray-700">
              <p>
                Humidity:{" "}
                <span className="font-semibold">{weather.main.humidity}%</span>
              </p>
              <p>
                Wind:{" "}
                <span className="font-semibold">{weather.wind.speed} m/s</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
