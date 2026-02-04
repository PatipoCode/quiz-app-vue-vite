<template>
  <div class="loader">
    <div class="loader__spinner"></div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
}

.loader__spinner {
  width: 100px;
  height: 100px;
  border: 5px solid rgba($accent, 0.25);
  border-top-color: $accent;
  border-radius: 50%;
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
