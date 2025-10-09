<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  current: number;
  total: number;
  rounded?: boolean;
}>();

const percent = computed(() => {
  if (!props.total) return 0;
  const done = Math.min(props.current + 1, props.total);
  return Math.round((done / props.total) * 100);
});
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__header">
      <slot name="top">
        <span class="progress-bar__current">{{
          Math.min(current + 1, total)
        }}</span>
        /
        <span class="progress-bar__total">{{ total }}</span>
      </slot>
    </div>

    <div
      class="progress-bar__track"
      :class="{ 'progress-bar__track--rounded': rounded }"
    >
      <div class="progress-bar__fill" :style="{ width: percent + '%' }"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.progress-bar {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 13px;
}

.progress-bar__header {
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  line-height: 20px;
  letter-spacing: 1px;
  color: $primary;
}

.progress-bar__current {
  color: $accent;
}
.progress-bar__header :slotted(.progress-bar__current) {
  color: $accent;
}

.progress-bar__track {
  position: relative;
  height: 4px;
  background: $primary;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar__track--rounded {
  border-radius: 100px;
}

.progress-bar__fill {
  position: absolute;
  inset: 0 auto 0 0;
  width: 0%;
  background: $accent;
  transition: width 220ms ease;
}
</style>
