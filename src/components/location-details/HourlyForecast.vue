<template>
  <main-layout>
    <section class="hourly-forecast">
      <h2>Hourly Forecast</h2>
      <div class="content">
        <div
          class="card"
          v-for="item in locationData.hourly"
          :key="item.weather[0].id"
        >
          <img
            :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
            alt="Sunny Icon"
          />
          <p>{{ Math.round(item.temp) }}º</p>
          <p>{{ formatTime(item.dt, locationData.timezone_offset) }}</p>
        </div>
      </div>
    </section>
  </main-layout>
</template>

<script lang="ts" setup>
import { formatTime } from "../../utils/format";
import MainLayout from "../templates/MainLayout.vue";

defineProps<{ locationData: any }>();
</script>

<style lang="scss" scoped>
.hourly-forecast {
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .content {
    display: flex;
    align-items: center;
    gap: 1rem;
    overflow-x: auto;

    .card {
      // background: #f5f5f5;
      background: #ccc;
      border-radius: 4px;
      width: 7rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;

      img {
        width: 7rem;
      }
    }
  }
}
</style>
