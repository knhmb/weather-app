<template>
  <main-layout>
    <div class="header">
      <h1>Weather</h1>
      <img :src="icons.User" alt="User Icon" />
    </div>
    <SearchForm />
  </main-layout>
</template>

<script lang="ts" setup>
import SearchForm from "../components/molecules/SearchForm.vue";
import MainLayout from "../components/templates/MainLayout.vue";
import { icons } from "../utils/icons";
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
