<script setup lang="ts">
import backIcon from "../assets/icons/back-icon.png";
</script>

<template>
  <button class="back-button" aria-label="Back">
    <img
      :src="backIcon"
      alt="Back button"
      aria-hidden="true"
      class="back-button__icon"
    />
  </button>
</template>

<style scoped lang="scss">
.back-button {
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;

  &__icon {
    position: absolute;
    top: 7px;
  }
}
</style>
