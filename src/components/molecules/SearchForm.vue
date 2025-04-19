<template>
  <div class="search-bar">
    <div class="search-input-container">
      <input
        type="text"
        :value="query"
        @input="handleInput"
        placeholder="Search for a city or airport"
        @blur="onBlur"
        @focus="onFocus"
      />
      <img :src="icons.SearchIcon" alt="Search Icon" />
    </div>

    <ul v-if="suggestions.length && showDropdown" class="suggestions">
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
      >
        {{ formatLocation(suggestion) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { icons } from "../../utils/icons";

interface LocationSuggestion {
  name: string;
  lat: number;
  lon: number;
  state?: string;
  country: string;
}

const router = useRouter();

const emit = defineEmits<{
  (e: "select", location: LocationSuggestion): void;
}>();

const query = ref("");
const suggestions = ref<LocationSuggestion[]>([]);
const showDropdown = ref(false);
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

let debounceTimer: ReturnType<typeof setTimeout>;

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  query.value = target.value;

  clearTimeout(debounceTimer);

  if (!query.value.trim()) {
    suggestions.value = [];
    return;
  }

  debounceTimer = setTimeout(() => {
    fetchSuggestions(query.value);
  }, 300);
};

const fetchSuggestions = async (input: string) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        input
      )}&limit=5&appid=${API_KEY}`
    );
    const data = await res.json();
    suggestions.value = data;
    showDropdown.value = true;
  } catch (err) {
    console.error("Failed to fetch suggestions", err);
  }
};

const selectSuggestion = (location: LocationSuggestion) => {
  emit("select", location);
  query.value = formatLocation(location);
  showDropdown.value = false;
  console.log(location);

  router.push({ name: "weather-detail", params: { state: location.state } });
};

const formatLocation = (loc: LocationSuggestion): string => {
  return `${loc.name}${loc.state ? ", " + loc.state : ""}, ${loc.country}`;
};

const onBlur = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 150);
};

const onFocus = () => {
  if (query.value && suggestions.value.length) {
    showDropdown.value = true;
  }
};
</script>

<style lang="scss" scoped>
.search-bar {
  position: relative;
  width: 100%;

  .search-input-container {
    position: relative;

    input {
      font-size: 16px;
      border-radius: 10px;
      padding: 8px 11px 8px 28px;
      background: #f7f7f9;
      border: none;
      width: 100%;
      outline: none;
    }

    img {
      position: absolute;
      top: 50%;
      left: 0.5rem;
      translate: 0 -50%;
    }
  }

  .suggestions {
    position: absolute;
    width: 100%;
    background: white;
    max-height: 200px;
    overflow-y: auto;
    z-index: 100;
    // border-radius: 0 0 10px 10px;

    li {
      padding: 8px 12px;
      cursor: pointer;
      border-bottom: 1px solid #d4d4d4;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
}
</style>
