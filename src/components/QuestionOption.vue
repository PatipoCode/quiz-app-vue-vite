<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import type { Type, Option } from "../types/quiz";

const { t } = useI18n();
const props = withDefaults(
  defineProps<{
    type: Type;
    options: Option[];
    selectedIds?: string[];
    variant?: "default" | "tiles";
  }>(),
  { variant: "default" }
);
const emit = defineEmits<{
  (e: "select", id: string): void;
}>();
const isSelected = (id: string) => props.selectedIds?.includes(id) ?? false;
const isMulti = computed(() => props.type === "multiple");
const isTiles = computed(() => props.variant === "tiles");
</script>

<template>
  <div
    v-if="type === 'single' || type === 'multiple'"
    :class="[
      'options',
      variant === 'tiles' ? 'options--tiles' : 'options--list',
    ]"
    role="group"
  >
    <button
      v-for="o in options"
      :key="o.id"
      type="button"
      :class="[
        variant === 'tiles' ? 'options__tile' : 'options__btn',
        isSelected(o.id)
          ? variant === 'tiles'
            ? 'options__tile--selected'
            : 'options__btn--selected'
          : '',
      ]"
      :aria-pressed="isSelected(o.id)"
      @click="emit('select', o.id)"
    >
      <slot name="option" :option="o" :selected="isSelected(o.id)">
        {{ t(o.labelKey) }}
      </slot>

      <span
        v-if="isMulti && !isTiles"
        class="options__check"
        :class="{ 'options__check--on': isSelected(o.id) }"
        aria-hidden="true"
      />
    </button>
  </div>

  <div v-else class="options options--bubbles" role="group">
    <button
      v-for="o in options"
      :key="o.id"
      type="button"
      class="options__bubble"
      :class="{ 'options__bubble--selected': isSelected(o.id) }"
      @click="emit('select', o.id)"
      :aria-pressed="isSelected(o.id)"
    >
      <slot name="option" :option="o" :selected="isSelected(o.id)">
        <span class="options__bubble-label">{{ t(o.labelKey) }}</span>
      </slot>
    </button>
  </div>
</template>

<style scoped lang="scss">
.options--list {
  display: grid;
  gap: 12px;
  margin-bottom: 16px;
}

.options--tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.options--bubbles {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.options__btn {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 26px 0;
  border: 0;
  border-radius: 16px;
  background-color: $option-bg-color;
  color: $secondary;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.08s ease, outline-color 0.2s ease;
  outline: 2px solid transparent;
}

.options__btn:active {
  transform: scale(0.98);
}

.options__btn--selected,
.options__btn:hover {
  outline-color: $accent;
  background-color: $option-bg-color-hover;
}

.options__tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 18px;
  border-radius: 18px;
  background: $option-bg-color;
  color: $btn-txt-color;
  outline: 2px solid transparent;
  transition: transform 0.08s ease, outline-color 0.2s ease;
  border: none;
}

.options__tile--selected,
.options__tile:hover {
  outline-color: $accent;
  background-color: $option-bg-color-hover;
}

.options__tile:active {
  transform: scale(0.98);
}

.options--tiles :slotted(.options__tile-emoji) {
  display: block;
  width: 52px;
  height: 52px;
}

.options--tiles :slotted(.options__tile-label) {
  display: block;
  margin-top: 10px;
  font-size: 16px;
}

.options__check {
  position: absolute;
  right: 30px;
  transform: translateY(-10%);
  width: 23px;
  height: 23px;
  border-radius: 8px;
  border: 1px solid $accent;
  background-color: $checkbox-bg-color;
}
.options__check--on {
  border-color: $accent;
  background: $accent;
}

.options__check--on::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 11.3px;
  height: 8.7px;
  background: url("../assets/icons/checkmark.png") no-repeat center / 100% 100%;
  pointer-events: none;
}

.options__bubble {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 88px;
  height: 88px;
  padding: 14px 12px;
  border-radius: 999px;
  border: 0;
  background-color: $option-bg-color;
  color: $btn-txt-color;
  cursor: pointer;
  outline: 2px solid transparent;
  transition: transform 0.08s ease, outline-color 0.2s ease;
}

.options__bubble:active {
  transform: scale(0.98);
}

.options__bubble--selected,
.options__bubble:hover {
  outline-color: $accent;
  background-color: $option-bg-color-hover;
}
.options__bubble-label {
  font-size: 14px;
  white-space: nowrap;
}

.options--bubbles :slotted(.options__bubble-icon) {
  display: block;
  width: 25px;
  height: 25px;
}
</style>
