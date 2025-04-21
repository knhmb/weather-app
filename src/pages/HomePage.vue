<template>
  <main-layout>
    <LoadingSpinner v-if="isLoading" />
    <div class="header" v-if="!isLoading">
      <h1>Weather</h1>
      <img
        @click="router.push('/edit-profile')"
        :src="icons.User"
        alt="User Icon"
      />
    </div>
    <SearchForm />
    <template v-if="locationStore.locations.length > 0">
      <WeatherCard
        v-for="item in locationStore.locations"
        :key="item.id"
        :id="item.id"
        :location="item.name"
        :description="item.weather[0].description"
        :main-temp="item.main.temp"
        :max-temp="item.main.temp_max"
        :min-temp="item.main.temp_min"
        :condition="item.weather[0].main"
        :time="item.dt"
        :timezone="item.timezone"
        :is-my-location="item.isMyLocation"
        @select="selectLocation"
      />
    </template>
  </main-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchWeatherByCoords } from "../store/weather";
import { locationStore } from "../store/locationDetails";
import { icons } from "../utils/icons";
import MainLayout from "../components/templates/MainLayout.vue";
import SearchForm from "../components/molecules/SearchForm.vue";
import WeatherCard from "../components/atoms/WeatherCard.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const router = useRouter();
const isLoading = ref(false);

const selectLocation = (id: number) => {
  const selectedLocation = locationStore.locations.find(
    (loc: any) => loc.id === id
  );

  locationStore.setLocation({
    state: selectedLocation.name,
    country: selectedLocation.sys.country,
    lat: selectedLocation.coord.lat,
    lon: selectedLocation.coord.lon,
  });

  router.push({
    name: "weather-detail",
    params: { state: selectedLocation.name },
  });
};

onMounted(() => {
  isLoading.value = true;

  try {
    if (locationStore.locations.length === 0) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const result = await fetchWeatherByCoords(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );

        if (result) {
          locationStore.setLocations(result, true);
        }
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
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
