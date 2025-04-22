<template>
  <div
    @click="emits('select', id)"
    class="weather-card"
    :style="{ backgroundImage: `url(${checkCondition})` }"
  >
    <div class="top">
      <div class="location">
        <h2>{{ isMyLocation ? "My Location" : location }}</h2>
        <p>{{ isMyLocation ? location : locationTime }}</p>
      </div>
      <div class="temp">{{ Math.round(mainTemp) }}°</div>
    </div>
    <div class="bottom">
      <p>{{ description }}</p>
      <p>
        <span>H:{{ Math.round(maxTemp) }}°</span
        ><span>L:{{ Math.round(minTemp) }}°</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { images } from "../../utils/icons";
import { formatTime } from "../../utils/format";

const emits = defineEmits(["select"]);

const props = defineProps<{
  id: number;
  location: string;
  description: string;
  mainTemp: number;
  maxTemp: number;
  minTemp: number;
  condition: string;
  time: number;
  timezone: number;
  isMyLocation: boolean;
}>();

const locationTime = formatTime(props.time, props.timezone);

const checkCondition = computed(() => {
  if (props.condition.toLowerCase() === "thunderstorm") return images.Cloudy;
  return images.Sunny;
});
</script>

<style lang="scss" scoped>
.weather-card {
  border-radius: 15px;
  color: white;
  padding: 1rem;
  margin: 12px 0;
  background-size: cover;
  background-position: center;
  margin-top: 1rem;
  cursor: pointer;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }

    .temp {
      font-size: 53px;
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 1rem;
      text-transform: capitalize;

      span:first-of-type {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
