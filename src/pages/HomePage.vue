<template>
  <main-layout>
    <div class="header">
      <h1>Weather</h1>
      <img :src="icons.User" alt="User Icon" />
    </div>
    <!-- <SearchForm @select="fetchLocation" /> -->
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
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchWeatherByCoords } from "../store/weather";
import { locationStore } from "../store/locationDetails";
import { icons } from "../utils/icons";
import MainLayout from "../components/templates/MainLayout.vue";
import SearchForm from "../components/molecules/SearchForm.vue";
import WeatherCard from "../components/atoms/WeatherCard.vue";

const router = useRouter();

const selectLocation = (id: number) => {
  console.log(id);

  const selectedLocation = locationStore.locations.find(
    (loc: any) => loc.id === id
  );
  console.log(selectedLocation);

  locationStore.setLocation({
    state: selectedLocation.name,
    country: selectedLocation.sys.country,
    lat: selectedLocation.coord.lat,
    lon: selectedLocation.coord.lon,
  });
  console.log(locationStore.locationDetails);

  router.push({
    name: "weather-detail",
    params: { state: selectedLocation.name },
  });
};

// const fetchLocation = async (location: any) => {
//   const result = await fetchWeatherByCoords({
//     lat: location.lat,
//     lon: location.lon,
//   });
//   // if (result) localStorage.setItem("locationDetails", JSON.stringify(location));
//   if (result) locationStore.setLocation(result);
//   console.log(result);
// };

onMounted(() => {
  if (locationStore.locations.length === 0) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const result = await fetchWeatherByCoords({
        lat: latitude,
        lon: longitude,
      });
      if (result) locationStore.setLocations(result, true);
    });
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
