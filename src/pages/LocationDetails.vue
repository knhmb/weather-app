<template>
  <section class="top-section">
    <main-layout>
      <div class="header">
        <div class="icon">1</div>
        <p>{{ locationDetails.state }}, {{ locationDetails.country }}</p>
        <div class="icon">2</div>
      </div>
      <div class="details">
        <p>Monday, 20 December 2021</p>
        <img :src="icons.SunnyIcon" alt="Sunny Icon" />
        <div class="temp-info">
          <p>24º C</p>
          <p>Moderate Rain</p>
        </div>
        <p>Last Update 6:00 PM</p>
      </div>
    </main-layout>
  </section>
</template>

<script lang="ts" setup>
import MainLayout from "../components/templates/MainLayout.vue";
import { icons } from "../utils/icons";

const locationDetails = JSON.parse(
  localStorage.getItem("locationDetails") || "{}"
);
</script>

<style lang="scss" scoped>
.top-section {
  background: linear-gradient(#4f80fa, #3764d7, #335fd1);
  height: 40%;
  color: #fff;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;

    p {
      font-size: 14px;
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

        &:first-of-type {
          margin-bottom: 0.3rem;
        }
      }
    }
  }
}
</style>
