<template>
  <button><slot /></button>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
button {
  all: unset;
  background-color: #2e3a5a;
  border-radius: 8px;
  padding: 12.5px 16px;
  width: min(50%, 300px);
}
</style>
