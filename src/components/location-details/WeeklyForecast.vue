<template>
  <main-layout>
    <section class="weekly-forecast">
      <h2>Weekly Forecast</h2>
      <div class="card" v-for="item in locationData.daily" :key="item.dt">
        <div class="left">
          <div class="icon">
            <img
              :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
              alt="Weather Icon"
            />
          </div>
          <div class="info">
            <p>{{ formatDay(item.dt) }}</p>
            <p>{{ item.weather[0].description }}</p>
          </div>
        </div>
        <div class="right">
          <p>{{ Math.round(item.temp.day) }}º C</p>
          <img :src="icons.CaretRight" alt="Caret Right" />
        </div>
      </div>
    </section>
  </main-layout>
</template>

<script lang="ts" setup>
import { icons } from "../../utils/icons";
import MainLayout from "../templates/MainLayout.vue";

defineProps<{ locationData: any }>();

const formatDay = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "long",
  });
};
</script>

<style lang="scss" scoped>
.weekly-forecast {
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .card {
    background: #d2dfff;
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .left {
      display: flex;
      align-items: center;
      gap: 1rem;

      .icon {
        background: #9ab6ff;
        width: 40px;
        height: 40px;
        border-radius: 50%;

        img {
          width: 100%;
        }
      }

      .info {
        p {
          font-size: 13px;
          text-transform: capitalize;

          &:first-of-type {
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
}
</style>
