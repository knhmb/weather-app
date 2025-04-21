import type { WeatherParams } from "../types/weather";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherByCoords = async (query: WeatherParams) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("Weather fetch failed");
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
