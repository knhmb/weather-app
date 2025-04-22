# 🌤️ Vue 3 Weather App

A modern weather application built with **Vue 3**, leveraging the Composition API and `reactive()` for global state management. The app integrates with the **OpenWeatherMap API** to display current weather conditions, hourly forecasts, and weekly forecasts. Users can search for locations, view detailed weather information, and manage a list of saved locations.

---

## 🚀 Features

- 🌍 Detect and display weather based on the user's current location
- 🔍 Search for weather information by location name
- 🕒 View hourly and 7-day weather forecasts
- ➕ Add or remove locations from a saved list
- 🌐 Display local time based on the location's timezone
- 📱 Responsive design optimized for mobile devices
- 💾 Persist user data using `localStorage` and Vue's `watch` API

---

## 🛠️ Tech Stack

- **Vue 3** with the Composition API
- **SCSS** for styling
- **OpenWeatherMap API** for weather data
- **LocalStorage** for data persistence
- **Vue Router** for navigation

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/weather-app.git
cd weather-app

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## 🔑 Environment Variables

VITE_WEATHER_API_KEY=your_api_key_here

---

## 📂 Project Structure

src/
├── assets/
├── components/
├── pages/
├── router/
├── store/
├── types/
├── utils/
├── App.vue
├── main.ts
├── style.css

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
