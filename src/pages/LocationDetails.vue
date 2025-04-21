<template>
  <section class="top-section">
    <Notification
      @close-notification="closeNotification"
      :is-clicked="isClicked"
      :is-initial="isInitial"
    />
    <LoadingSpinner v-if="isLoading" />
    <main-layout v-else>
      <div class="header">
        <img
          @click="router.go(-1)"
          :src="icons.ChevronLeft"
          alt="Chevron Left"
        />
        <p v-if="location">
          {{ location.name }},
          {{ location.sys?.country }}
        </p>
        <img
          v-if="!isLocationSaved"
          @click="addLocation"
          :src="icons.PlusIcon"
          alt="Plus Icon"
        />
        <img
          v-else
          @click="deleteLocation"
          :src="icons.DeleteIcon"
          alt="Delete Icon"
        />
      </div>
      <div class="details" v-if="Object.keys(location).length > 0">
        <p>{{ formattedDate }}</p>
        <img
          :src="`https://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`"
          alt="Sunny Icon"
        />
        <div class="temp-info">
          <p>{{ Math.round(location.main.temp) }}º C</p>
          <p>{{ location.weather[0].description }}</p>
        </div>
        <p class="last-updated">
          Last update: {{ lastUpdate
          }}<img @click="fetchData" :src="icons.Refresh" alt="Refresh Icon" />
        </p>
      </div>
    </main-layout>
  </section>
  <template v-if="!isLoading">
    <HourlyForecast :location-data="allLocationData" />
    <WeeklyForecast :location-data="allLocationData" />
  </template>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { icons } from "../utils/icons";
import { locationStore } from "../store/locationDetails";
import MainLayout from "../components/templates/MainLayout.vue";
import { fetchWeatherByCoords } from "../store/weather";
import HourlyForecast from "../components/location-details/HourlyForecast.vue";
import WeeklyForecast from "../components/location-details/WeeklyForecast.vue";
import Notification from "../components/ui/Notification.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const router = useRouter();
const location = ref<any>({});
const allLocationData = ref([]);
const isClicked = ref(false);
const lastUpdate = ref("");
const isLoading = ref(false);
const isInitial = ref(true);
const locationDetails = locationStore.locationDetails;
const date = new Date();

const formattedDate = date.toLocaleDateString("en-US", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const isLocationSaved = computed(() => {
  return locationStore.locations.some(
    (loc: any) => loc.id === location.value.id
  );
});

const addLocation = () => {
  locationStore.setLocations(location.value);
  isClicked.value = true;
  isInitial.value = false;
  setTimeout(() => {
    isClicked.value = false;
  }, 3000);
};

const deleteLocation = () => {
  locationStore.deleteLocation(location.value.id);
  router.replace("/");
};

const closeNotification = () => {
  isClicked.value = false;
};

const fetchData = async () => {
  if (!locationDetails) return;

  isLoading.value = true;
  try {
    const result = await fetchWeatherByCoords({
      lat: locationDetails.lat,
      lon: locationDetails.lon,
    });

    if (!result) throw new Error("Failed to fetch location data");

    location.value = result;

    // Update the last updated time
    lastUpdate.value = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // 2. Fetch hourly forecasts using updated location
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${locationDetails.lat}&lon=${locationDetails.lon}&exclude=minutely,current,alerts&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error("Hourly forecast request failed");

    const data = await response.json();
    allLocationData.value = data;
  } catch (err) {
    console.error("Error fetching weather data:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchData();
});
</script>

<style lang="scss" scoped>
.top-section {
  background: linear-gradient(#4f80fa, #3764d7, #335fd1);
  min-height: 45vh;
  color: #fff;
  position: relative;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      cursor: pointer;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;

    p {
      font-size: 14px;

      &.last-updated {
        display: flex;
        align-items: center;

        img {
          width: 1rem;
          margin-left: 0.5rem;
          margin-top: 0;
          cursor: pointer;
        }
      }
    }

    img {
      width: 8rem;
      margin-top: 1.5rem;
    }

    .temp-info {
      text-align: center;
      margin-bottom: 3rem;

      p {
        font-size: 20px;
        text-transform: capitalize;

        &:first-of-type {
          margin-bottom: 0.3rem;
        }
      }
    }
  }
}
</style>
