<template>
  <main-layout>
    <div class="header">
      <h1>Weather</h1>
      <img :src="icons.User" alt="User Icon" />
    </div>
    <SearchForm @select="fetchLocation" />
    <template v-if="weatherData.length > 0">
      <WeatherCard
        v-for="item in weatherData"
        :key="item.id"
        :location="item.name"
        :description="item.weather[0].description"
        :main-temp="item.main.temp"
        :max-temp="item.main.temp_max"
        :min-temp="item.main.temp_min"
        :condition="item.weather[0].main"
      />
    </template>
  </main-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { fetchWeatherByCoords } from "../store/weather";
import MainLayout from "../components/templates/MainLayout.vue";
import SearchForm from "../components/molecules/SearchForm.vue";
import WeatherCard from "../components/atoms/WeatherCard.vue";
import { icons } from "../utils/icons";

const weatherData = ref<any[]>([]);

const fetchLocation = async (location: any) => {
  const result = await fetchWeatherByCoords({
    lat: location.lat,
    lon: location.lon,
  });
  if (result) localStorage.setItem("locationDetails", JSON.stringify(location));
};

onMounted(() => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const result = await fetchWeatherByCoords({
      lat: latitude,
      lon: longitude,
    });
    if (result) weatherData.value = result;
  });
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  img {
    width: 24px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
