<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  current: number;
  total: number;
  rounded?: boolean;
  label?: string;
}>();

const { t } = useI18n();

const currentStep = computed(() => Math.min(props.current + 1, props.total));

const percent = computed(() =>
  props.total ? Math.round((currentStep.value / props.total) * 100) : 0
);

const progressLabel = computed(() => {
  return (
    props.label ||
    t("progress_bar.question", {
      current: currentStep.value,
      total: props.total,
    })
  );
});

const progressText = computed(() => {
  return t("progress_bar.completed", { percent: percent.value });
});
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__header" aria-hidden="true">
      <slot name="top">
        <span class="progress-bar__header-text">
          <span class="progress-bar__current">{{ currentStep }}</span>
          /
          <span class="progress-bar__total">{{ total }}</span>
        </span>
      </slot>
    </div>

    <div
      class="progress-bar__track"
      :class="{ 'progress-bar__track--rounded': rounded }"
      role="progressbar"
      aria-live="polite"
      aria-atomic="false"
      :aria-valuenow="currentStep"
      :aria-valuemin="1"
      :aria-valuemax="total"
      :aria-label="progressLabel"
      :aria-valuetext="progressText"
    >
      <div
        class="progress-bar__fill"
        :style="{ width: percent + '%' }"
        aria-hidden="true"
      ></div>
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

.progress-bar__header-text {
  display: inline-block;
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
