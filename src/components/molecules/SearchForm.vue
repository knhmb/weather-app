<template>
  <form @submit.prevent="submit">
    <div class="search-input-container">
      <input
        type="text"
        v-model="query"
        placeholder="Search for city or airport"
      />
      <img :src="icons.SearchIcon" alt="Search Icon" />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { icons } from "../../utils/icons";

const emit = defineEmits(["search"]);
const query = ref("");

const submit = () => {
  if (query.value) emit("search", query.value);
};
</script>

<style lang="scss" scoped>
.search-input-container {
  position: relative;

  input {
    border-radius: 10px;
    padding: 8px 11px 8px 28px;
    background: #f7f7f9;
    border: none;
    width: 100%;
  }

  img {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    translate: 0 -50%;
  }
}
</style>
