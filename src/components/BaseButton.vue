<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
    type?: "button" | "submit";
    title: string;
  }>(),
  { type: "button" }
);

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    class="base-button"
    :class="{ 'base-button--disabled': disabled }"
    :type="type"
    :disabled="disabled"
    @click="emit('click')"
  >
    <span class="base-button__label">
      {{ title }}
    </span>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  position: absolute;
  bottom: 20px;
  width: 90%;
  height: 56px;
  padding: 16px;
  border: 0;
  border-radius: 1000px;
  background-color: $accent;
  color: $btn-txt-color;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: $transition-opacity;

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(&--disabled) {
    opacity: 0.8;
  }

  @include focus-visible;

  &__label {
    display: inline-block;
    line-height: 1.5;
  }
}
</style>
