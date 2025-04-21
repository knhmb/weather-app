<template>
  <div class="loading-spinner"></div>
</template>

<style lang="scss" scoped>
.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 3px solid #eee;
  border-top-color: lightblue;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50%, -50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(360deg);
    }
  }
}
</style>
