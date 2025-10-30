<script setup lang="ts">
import BackIcon from "../assets/icons/back-icon.svg";
</script>

<template>
  <button class="back-button" type="button" aria-label="Back">
    <BackIcon class="back-button__icon" aria-hidden="true" />
  </button>
</template>

<style scoped lang="scss">
.back-button {
  position: absolute;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 8px;

  @include focus-visible;

  &:hover .back-button__icon {
    color: $accent;
  }
}

.back-button__icon {
  display: block;
  width: 10px;
  height: 16px;
  color: $btn-txt-color;
  transition: $transition;
}
</style>
