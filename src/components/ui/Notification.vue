<template>
  <div
    class="notification"
    :class="{
      visible: !isInitial && isClicked,
      hidden: !isInitial && !isClicked,
    }"
  >
    <p>Location Added Successfully</p>
    <p @click="emits('close-notification')">x</p>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";

defineProps<{ isClicked: boolean; isInitial: boolean }>();
const emits = defineEmits(["close-notification"]);
</script>

<style lang="scss" scoped>
.notification {
  width: 90%;
  border-radius: 4px;
  padding: 1rem;
  background: lightgreen;
  position: fixed;
  top: -100%;
  left: 50%;
  translate: -50% 0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.visible {
    animation: slide-in 0.3s ease forwards;
  }

  &.hidden {
    animation: slide-out 0.3s ease forwards;
  }

  p:last-of-type {
    cursor: pointer;
  }

  @keyframes slide-in {
    from {
      top: -100%;
    }

    to {
      top: 0.5rem;
    }
  }

  @keyframes slide-out {
    from {
      top: 0.5rem;
    }

    to {
      top: -100%;
    }
  }
}
</style>
